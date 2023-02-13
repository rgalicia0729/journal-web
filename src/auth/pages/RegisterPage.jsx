import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout.jsx';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth';

const initForm = {
    displayName: '',
    email: '',
    password: '',
}

const formValidations = {
    displayName: [(value) => value.length > 1, 'El nombre es obligatorio.'],
    email: [(value) => value.includes('@'), 'El correo debe de contener una @.'],
    password: [(value) => value.length > 6, 'La contraseña debe de ser mayor a 6 caracteres'],
}

export const RegisterPage = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { status, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const {
        displayName,
        email,
        password,
        onFormChange,
        displayNameValid,
        emailValid,
        passwordValid,
        isFormValid,
    } = useForm(initForm, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (isFormValid) {
            dispatch(startCreatingUserWithEmailAndPassword({ displayName, email, password }));
        }
    }

    return (
        <AuthLayout title="Crear cuenta">
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            label="Nombre completo"
                            placeholder="Nombre completo"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onFormChange}
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="email"
                            label="correo"
                            placeholder="correo@gmail.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onFormChange}
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="password"
                            label="contraseña"
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onFormChange}
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" disabled={isCheckingAuthentication} fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/login">
                            Ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
}