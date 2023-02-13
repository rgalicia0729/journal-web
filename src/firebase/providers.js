import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { firebaseAuth } from "./config.js";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        const user = result.user;
        const { displayName, email, photoURL, uid } = user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUserWithEmailAndPassword = async ({ displayName, email, password }) => {
    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile(firebaseAuth.currentUser, {
            displayName,
        });

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage,
        }
    }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
    try {
        const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, displayName, photoURL } = result.user;

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage,
        }
    }
}