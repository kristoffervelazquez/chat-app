import ChatLayout from "./layout/ChatLayout"
import ChatView from "./views/ChatView"
import NothingSelectedView from "./views/NothingSelectedView"
import { useSelector } from "react-redux"
import MainView from "./views/MainView"

const ChatScreen = () => {
    const { active } = useSelector(state => state.chats)

    return (
        <ChatLayout>
            {
                active ?
                    <ChatView />
                    :
                    <MainView/>
            }
        </ChatLayout>
    )
}

export default ChatScreen