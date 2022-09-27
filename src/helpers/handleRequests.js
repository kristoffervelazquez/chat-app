import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import addFriend from "./addFriend"
import { loadUserInformation } from "./loadUserInformation";



export const AcceptRequest = async (firstUser, secondUser) => {

    await addFriend(firstUser, secondUser);
    await addFriend(secondUser, firstUser);
    await deleteRequest(firstUser, secondUser);
    await deleteRequest(secondUser, firstUser);
    await deleteSended(secondUser, firstUser)
    await addDoc(collection(db, 'chats'), { users: [firstUser, secondUser] });


}


export const DenyRequest = async (firstUser, secondUser) => {
    await deleteRequest(firstUser, secondUser);
    await deleteRequest(secondUser, firstUser);
    await deleteSended(secondUser, firstUser)

}


const deleteRequest = async (firstUser, secondUser) => {

    const { docRef, requests } = await loadUserInformation(firstUser)

    const filteredList = requests.filter(request => request.id !== secondUser);

    await updateDoc(docRef, {
        requests: filteredList
    })

}


const deleteSended = async (secondUser, firstUser) => {
    const { docRef, sended } = await loadUserInformation(secondUser)

    const filteredList = sended.filter(sended => sended.id !== firstUser);

    await updateDoc(docRef, {
        sended: filteredList
    })
}

