import { checkingCredentials, login, logout } from './authSlice';
import { loginWithEmailAndPassword, registerUserWithEmailAndPassword, signInWithGoogle, logoutFirebase } from '../../firebase/providers';

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailAndPassword = ({ displayName, email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailAndPassword({ displayName, email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, photoURL, displayName, email }));
    }
}

export const startLoginWithUserAndPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage, displayName } = await loginWithEmailAndPassword({ email, password });

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, photoURL, displayName, email }));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();

        dispatch(logout());
    }
}