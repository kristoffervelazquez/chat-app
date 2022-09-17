import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { login, logout } from '../../components/store/auth/authSlice';
import { firebaseAuth } from '../../firebase/firebaseConfig';
import { startLoadingFriends } from '../../components/store/auth/thunks';
import { startLoadingChats } from '../../components/store/chats/thunks';




const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async (user) => {
            if (!user) return dispatch(logout());
            const { uid, email, photoURL, displayName } = user;
            dispatch(login({ uid, email, photoURL, displayName }))
            dispatch(startLoadingFriends(uid));
            dispatch(startLoadingChats(email));
        });
    }, [])

    return status;
}

export default useCheckAuth