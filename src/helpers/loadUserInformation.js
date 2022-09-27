import { db } from "../firebase/firebaseConfig"
import { doc, getDoc } from "firebase/firestore";


export const loadUserInformation = async (uid) => {

    const docRef = doc(db, 'users', uid)
    const documento = await getDoc(docRef);

    const { friends, email, name, id, picture, requests, sended } = documento.data();
    

    return { friends, email, name, id, picture, docRef, requests, sended};
}
