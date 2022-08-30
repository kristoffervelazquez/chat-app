import { useSelector, useDispatch } from "react-redux"
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { ArrowBack, ChatOutlined } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, ListItemButton, List, ListItemIcon, ListItemText, Toolbar, Typography, IconButton } from "@mui/material"
import { setActiveChat } from "../../../components/store/chats/thunks";
import { db } from "../../../firebase/firebaseConfig";



const SideBar = ({ drawerWidth, displayMenu, setDisplayMenu }) => {

    const dispatch = useDispatch()
    const { displayName, email } = useSelector(state => state.auth);

    const [snapshot] = useCollection(collection(db, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));



    const handleClick = (id, chat) => {
        dispatch(setActiveChat(id, chat));
        setDisplayMenu(false);
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
                variant='temporary' // temporary
                open={displayMenu}
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <IconButton sx={{ ml: -2 }} onClick={() => { setDisplayMenu(false) }} >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant='h6' noWrap component='div'>{displayName}</Typography>

                </Toolbar>
                <Divider />
                {
                    <List>
                        {
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
                }
            </Drawer>
        </Box>
    )
}

export default SideBar