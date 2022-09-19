import { db } from "../firebase/firebaseConfig"
import { getDocs, collection, query, where, updateDoc, doc } from "firebase/firestore"

const addFriend = async (uid, firendList, firendToAdd) => {
    const q = query(collection(db, 'users'), where('id', '==', uid))
    const docu = await getDocs(q);
    const docRef = doc(db, 'users', docu.docs[0].id)
    await updateDoc(docRef, {
        friends: [...firendList, firendToAdd]
    })
}

export default addFriend