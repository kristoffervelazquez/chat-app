import { Typography } from "@mui/material"
import ChatLayout from "./layout/ChatLayout"
import ChatView from "./views/ChatView"
import NothingSelectedView from "./views/NothingSelectedView"

const ChatScreen = () => {
    return (
        <ChatLayout>
            <NothingSelectedView />
            {/* <ChatView /> */}
        </ChatLayout>
    )
}

export default ChatScreen