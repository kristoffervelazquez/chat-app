import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { registerUserWithEmailPassword, signInWithGoogle, logInWithEmailAndPassword, logoutFirebase } from "../../../firebase/providers";
import { createUserDocument } from "../../../helpers/createUserDocument";
import { loadUserInformation } from "../../../helpers/loadUserInformation";
import { checkingCredentials, loadFriends, loadRequests, loadSended, login, logout } from "./authSlice"



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

        if (result.ok) {
            await dispatch(login(result));
            await dispatch(createUserDocument(result));
        }



    }
}


export const startCreateWithEmailAndPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword(email, password, displayName);

        if (!ok) return dispatch(logout({ errorMessage }));

        await dispatch(login(email, password, displayName, photoURL, uid));
        await dispatch(createUserDocument({ email, password, displayName, photoURL, uid }));

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


export const startLoadingUserInformation = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const docRef = doc(db, 'users', uid);       


        const unsub = onSnapshot(docRef, (doc) => {
            dispatch(loadRequests(doc.data().requests));
            dispatch(loadFriends(doc.data().friends));
            dispatch(loadSended(doc.data().sended));
        });



    }
}












