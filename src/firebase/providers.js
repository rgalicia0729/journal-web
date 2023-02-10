import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {firebaseAuth} from "./config.js";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        const user = result.user;
        const {displayName, email, photoURL, uid} = user;

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