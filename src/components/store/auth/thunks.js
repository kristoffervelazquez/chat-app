import { registerUserWithEmailPassword, signInWithGoogle, logInWithEmailAndPassword, logoutFirebase } from "../../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"



export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));

    }
}


export const startCreateWithEmailAndPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword(email, password, displayName);

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login(email, password, displayName, photoURL, uid));
    }
};



export const startLoginWithEmailAndPassword = ({ email, password }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await logInWithEmailAndPassword(email, password);

        if (!result.ok) return dispatch(logout({ errorMessage: result.errorMessage }));

        dispatch(login(result));


    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();

        dispatch(logout());
    }
}

