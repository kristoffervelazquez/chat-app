import { Navigate } from 'react-router-dom'

const PublicRouter = ({ status, children }) => {

    return (status === 'authenticated') ? <Navigate replace to="/" />
        :
        children
}

export default PublicRouter