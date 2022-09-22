import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import userExist from "./userExist";


export const createUserDocument = async (user) => {

    const { email, displayName, photoURL, uid } = await user;
    const docRef = doc(db, 'users', uid);

    const userInformation = {
        id: uid,
        name: displayName,
        picture: photoURL,
        email: email,
        friends: [],
        requests: [],
        sended: []
    }

    if (userExist(uid)) {
        console.log('El usuario ya existe');
        return;

    }

    await setDoc(docRef, userInformation);
}