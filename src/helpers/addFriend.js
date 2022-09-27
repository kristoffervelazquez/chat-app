import { updateDoc, addDoc, collection} from "firebase/firestore"
import { db } from "../firebase/firebaseConfig";
import { loadUserInformation } from "./loadUserInformation"

const addFriend = async (uid, friendToAdd) => {
    
    const { friends, docRef } = await loadUserInformation(uid)

    await updateDoc(docRef, {
        friends: [...friends, friendToAdd]
    })
    
    console.log(friends);
    

}

export default addFriend