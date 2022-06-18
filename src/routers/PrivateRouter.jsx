import { Navigate } from 'react-router-dom'


const PrivateRouter = ({children , status }) => {

    return status === 'authenticated' ? children : <Navigate to='auth/login'/>
}

export default PrivateRouter