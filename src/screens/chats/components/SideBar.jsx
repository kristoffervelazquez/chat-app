import { useSelector, useDispatch } from "react-redux"
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import validator from "validator";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { ChatOutlined, PersonAdd } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { addNewChat, setActiveChat } from "../../../components/store/chats/thunks";
import { db } from "../../../firebase/firebaseConfig";



const SideBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch()
    const { displayName, email } = useSelector(state => state.auth);

    const [snapshot, loading, error] = useCollection(collection(db, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const chatExists = mail => chats?.find(chat => (chat.users.includes(email) && chat.users.includes(mail)));

    const handleAddChat = () => {
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

    const handleClick = (id, chat) => {
        dispatch(setActiveChat(id, chat));
    }

    const displayUser = (users) => {
        return users.filter(user => user !== email);
    }



    return (
        <Box
            component='nav'
            sx={{ sm: drawerWidth, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
                    <IconButton onClick={handleAddChat} color='primary'>
                        <PersonAdd />
                    </IconButton>
                </Toolbar>
                <Divider />

                <List>
                    {
                        chats &&
                        chats?.filter(chat => chat.users.includes(email))
                            .map(({ id, users }) => (

                                <ListItemButton key={id} onClick={() => { handleClick(id, { username: displayUser(users) }) }}>
                                    <ListItemIcon>
                                        <ChatOutlined />
                                    </ListItemIcon> {/* Imagen de la persona del chat */}
                                    <Grid container>
                                        <ListItemText primary={displayUser(users)} />
                                        {/* <ListItemText secondary={`${msg} ${time}`} /> */}
                                    </Grid>
                                </ListItemButton>


                            ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}

export default SideBar