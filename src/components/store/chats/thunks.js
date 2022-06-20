import { activeChat } from "./chatsSlice"



export const setActiveChat = (id, chat) => {

    return (dispatch) => {
        dispatch(activeChat({ id, chat }))
    }
}