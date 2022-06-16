import { Navigate } from 'react-router-dom'
import ChatScreen from '../screens/chats/ChatScreen'

const PrivateRouter = () => {
    return (
        <ChatScreen />
    )
    // <Navigate to='/' replace />
}

export default PrivateRouter