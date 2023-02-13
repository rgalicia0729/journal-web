import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/';
import { startGoogleSignIn, startLoginWithUserAndPassword } from "../../store/auth";

export const LoginPage = () => {
    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const { email, password, onFormChange, onResetForm } = useForm({
        email: '',
        password: ''
    });

    const onSubmit = (event) => {
        event.preventDefault();

        dispatch(startLoginWithUserAndPassword({ email, password }));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="email"
                            label="correo"
                            name="email"
                            placeholder="correo@gmail.com"
                            fullWidth
                            value={email}
                            onChange={onFormChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="password"
                            label="contraseña"
                            name="password"
                            placeholder="Contraseña"
                            fullWidth
                            value={password}
                            onChange={onFormChange}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button type="submit" variant="contained" disabled={isAuthenticating} fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" fullWidth onClick={onGoogleSignIn} disabled={isAuthenticating}>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color="inherit" to="/auth/register">
                            Crear cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
}