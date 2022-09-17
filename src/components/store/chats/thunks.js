import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig"
// import loadChatList from "../../../helpers/loadChatList"
import { activeChat, closeChat, loadChats, newChat } from "./chatsSlice"



export const setActiveChat = (id, chat) => {

    return (dispatch) => {
        dispatch(activeChat({ id, chat }))
    }
}

export const closeActiveChat = () => {
    return (dispatch) => {
        dispatch(closeChat());
    }
}


export const addNewChat = (newUser) => {
    return async (dispatch, getState) => {
        const user = getState().auth;

        await addDoc(collection(db, 'chats'), { users: [user.email, newUser] });
        // dispatch(newChat({ id: Date.now(), username: newUser, msg: 'xd', time: Date.now() }))
    }
}




export const startLoadingChats = (email) => {
    return async (dispatch, getState) => {
        
        const q = query(collection(db, "chats"), where("users", "array-contains", email))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {

                dispatch(loadChats({ id: doc.id, data: doc.data() }));

            });

        });

    }
}