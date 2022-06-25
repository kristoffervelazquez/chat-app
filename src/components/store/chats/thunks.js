import { addDoc, collection } from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig"
import { activeChat, newChat } from "./chatsSlice"



export const setActiveChat = (id, chat) => {

    return (dispatch) => {
        dispatch(activeChat({ id, chat }))
    }
}


export const addNewChat = (newUser) => {
    return async (dispatch, getState) => {
        const user = getState().auth;

        await addDoc(collection(db, 'chats'), { users: [user.email, newUser] });
        dispatch(newChat({ id: Date.now(), username: newUser, msg: 'xd', time: Date.now() }))
    }
}


// export const startLoadingChats = () => {
//     return async (dispatch, getState) => {
//         const user = getState().auth;
//         const [snapshot, loading, error] = useCollection(collection(db, "chats"))
//         const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//         console.log(chats)
//     }
// }