import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


const userExist = async (uid) => {
    const docRef = doc(db, 'users', uid)
    const documento = await getDoc(docRef);
    
    return documento.exists();
}



export default userExist