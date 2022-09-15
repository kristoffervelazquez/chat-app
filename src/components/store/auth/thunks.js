import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { registerUserWithEmailPassword, signInWithGoogle, logInWithEmailAndPassword, logoutFirebase } from "../../../firebase/providers";
import { loadFriendList } from "../../../helpers/loadFriendList";
import { checkingCredentials, loadFriends, login, logout } from "./authSlice"



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

export const startLoadingFriends = (uid) => {
    return async (dispatch) => {
        const friends = await loadFriendList(uid);
        dispatch(loadFriends(friends));
    }
}



// Create user document: 

export const createUserDocument = async (user) => {
    return async () => {
        const { email, displayName, photoURL, uid } = await user;

        const userInformation = {
            id: uid,
            name: displayName,
            picture: photoURL,
            email: email,
            friends: []
        }

        console.log(userInformation)

        const q = query(collection(db, 'users'), where('id', '==', uid),)
        const documento = await getDocs(q);

        if (documento.size <= 0) {
            await addDoc(collection(db, 'users'), userInformation);
        } else {
            console.log(documento.docs[0].data())
        }
    }


}




