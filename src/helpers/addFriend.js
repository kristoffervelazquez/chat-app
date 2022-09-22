import { updateDoc } from "firebase/firestore"
import { loadUserInformation } from "./loadUserInformation"

const addFriend = async (uid, firendToAdd) => {
    // const q = query(collection(db, 'users'), where('id', '==', uid))
    // const docu = await getDocs(q);
    // const docRef = doc(db, 'users', docu.docs[0].id)

    const { friends, docRef } = await loadUserInformation(uid)

    console.log(friends);
    await updateDoc(docRef, {
        friends: [...friends, firendToAdd]
    })
}

export default addFriend