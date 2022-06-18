import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        const { uid, displayName, email, photoURL } = result.user;

        return {
            ok: true,
            // User info
            uid, displayName, email, photoURL
        }

    } catch (e) {
        console.log(e);
        return {
            ok: false,
            errorMessage: e.message
        }
    }
}


export const registerUserWithEmailPassword = async (email, password, displayName) => {
    try {

        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile(firebaseAuth.currentUser, {
            displayName
        });

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}



export const logInWithEmailAndPassword = async (email, password) => {
    try {

        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, displayName, photoURL } = resp.user;

        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}



export const logoutFirebase = async () => {
    return firebaseAuth.signOut();
}   