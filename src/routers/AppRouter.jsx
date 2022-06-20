
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ChatScreen from '../screens/chats/ChatScreen'
import AuthRouter from './AuthRouter'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'
import CheckingAuth from '../ui/components/CheckingAuth'
import useCheckAuth from '../hooks/useCheckAuth/useCheckAuth'


const AppRouter = () => {

    const status = useCheckAuth();
   

    if (status === 'checking') return <CheckingAuth />




    return (
        <BrowserRouter>
            <Routes>
                {/*Private Route*/}
                <Route path='/' element={
                    <PrivateRouter status={status}>
                        <ChatScreen />
                    </PrivateRouter>
                } />

                {/*Public Route*/}
                <Route path='auth/*' element={
                    <PublicRouter status={status}>
                        <AuthRouter />
                    </PublicRouter>
                } />
                {/* Any other redirects to this route */}
                <Route path='*' element={<Navigate replace to='/auth/login' />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter