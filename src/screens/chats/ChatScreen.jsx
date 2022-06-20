import ChatLayout from "./layout/ChatLayout"
import ChatView from "./views/ChatView"
import NothingSelectedView from "./views/NothingSelectedView"
import { useSelector } from "react-redux"

const ChatScreen = () => {
    const { active } = useSelector(state => state.chats)

    return (
        <ChatLayout>
            {
                active ?
                    <ChatView />
                    :
                    <NothingSelectedView />
            }
        </ChatLayout>
    )
}

export default ChatScreen