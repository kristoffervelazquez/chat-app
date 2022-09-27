import { updateDoc } from 'firebase/firestore';
import { loadUserInformation } from './loadUserInformation';

const sendFriendRequest = async (userInfo, user) => {

    const { docRef, requests } = await loadUserInformation(user);
    await addToSended(userInfo.id, user);


    await updateDoc(docRef, {
        requests: [...requests, userInfo]
    })



}


export default sendFriendRequest


const addToSended = async (uid, user) => {
    const { docRef, sended } = await loadUserInformation(uid);
    await updateDoc(docRef, {
        sended: [...sended, { id: user, status: 'pending' }]
    })
}