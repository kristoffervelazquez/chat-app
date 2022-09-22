import { addDoc, collection, limitToLast, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { db } from "../../../firebase/firebaseConfig"
import { loadRequests } from "../auth/authSlice"
// import loadChatList from "../../../helpers/loadChatList"
import { activeChat, closeChat, loadChats, loadConversation, newChat } from "./chatsSlice"



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
    return async (dispatch) => {


        const q = query(collection(db, "chats"), where("users", "array-contains", email))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {


                dispatch(loadChats({ id: doc.id, data: doc.data() }));

            });

        });

    }
}


export const startLoadingConversation = () => {
    return async (dispatch, getState) => {
        const { chats } = await getState().chats;

        chats.forEach(chat => {
            const q = query(collection(db, `chats/${chat.id}/conversation`), orderBy("timestamp"), limitToLast(100));

            const unsub = onSnapshot(q, docs => {
                let conversation = [];
                docs.forEach(doc => {
                    const information = {
                        id: doc.id,
                        message: doc.data().message,
                        senderPhoto: doc.data().senderPhoto,
                        sender: doc.data().sender,
                        timestamp: doc.data().timestamp.seconds ? doc.data().timestamp.seconds : Date.now()
                    }

                    conversation = [...conversation, information];

                });
                dispatch(loadConversation({ id: chat.id, conversation: conversation }))
            })
        })
    }
}


export const startLoadingRequests = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        const q = query(collection(db, 'users'), where('id', '==', uid),)

        const unsub = onSnapshot(q, document => {
            if (document.docs[0].data().requests.length > 0) {
                dispatch(loadRequests(document.docs[0].data().requests));

            }
        })



    }
}
