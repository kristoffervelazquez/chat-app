import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import ChatScreen from '../screens/chats/ChatScreen'
import AuthRouter from './AuthRouter'
import PublicRouter from './PublicRouter'
import PrivateRouter from './PrivateRouter'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/*Private Route*/}
                <Route path='/' element={
                    <PrivateRouter>
                        <ChatScreen />
                    </PrivateRouter>
                } />

                {/*Public Route*/}
                <Route path='auth/*' element={
                    <PublicRouter>
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