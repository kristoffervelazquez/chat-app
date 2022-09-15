import { db } from "../firebase/firebaseConfig"
import { getDocs, collection, query, where } from "firebase/firestore"

export const loadFriendList = async (uid) => {
    const q = query(collection(db, 'users'), where('id', '==', uid),)
    const friendListSnap = await getDocs(q);
    const friends = [];

    friends.push(friendListSnap.docs[0].data().friends)

    return friends;
}
