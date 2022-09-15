import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


const userExist = async (uid) => {
    const q = query(collection(db, 'users'), where('id', '==', uid),)
    const documento = await getDocs(q);


    return (documento.size > 0)

}



export default userExist