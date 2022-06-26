import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import validator from "validator";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { LogoutOutlined, MenuOutlined, PersonAdd } from '@mui/icons-material'
import { startLogout } from '../../../components/store/auth/thunks'
import { addNewChat } from '../../../components/store/chats/thunks';
import { db } from '../../../firebase/firebaseConfig';


const NavBar = ({ drawerWidth, setDisplayMenu }) => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.chats)
    const { email } = useSelector(state => state.auth)
    const [snapshot] = useCollection(collection(db, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));



    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want to sign out!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startLogout());
            }
        })
    }

    const chatExists = mail => chats?.find(chat => (chat.users.includes(email) && chat.users.includes(mail)));


    const handleAddChat = () => {
        setDisplayMenu(false)
        Swal.fire({
            title: "Type the email and start chatting!",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Add a friend',
        }).then((result) => {
            if (result.isConfirmed) {
                if (validator.isEmail(result.value)) {
                    if (!chatExists(result.value) && result.value !== email) {
                        dispatch(addNewChat(result.value));
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'You already have a chat with this person!',
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This is not a valid email!',
                    })
                }
            }
        })




    }

    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <IconButton onClick={() => { setDisplayMenu(true) }} color='warning'>
                        <MenuOutlined />
                    </IconButton>
                    {
                        active &&
                        <Typography variant='h6' noWrap component='div'> {active.chat.username} </Typography>
                    }


                    <Grid>
                        <IconButton onClick={handleAddChat} color='warning'>
                            <PersonAdd />
                        </IconButton>

                        <IconButton onClick={handleLogout} color='error'>
                            <LogoutOutlined />
                        </IconButton>
                    </Grid>

                </Grid>

            </Toolbar>
        </AppBar>
    )
}

export default NavBar;