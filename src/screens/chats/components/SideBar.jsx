import { useSelector, useDispatch } from "react-redux"
import validator from "validator";
import { ChatOutlined, PersonAdd } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { addNewChat, setActiveChat } from "../../../components/store/chats/thunks";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";



const SideBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch()
    const { displayName } = useSelector(state => state.auth);

    const [snapshot, loading, error] = useCollection(collection(db, "chats"));
    const chats = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    

    const handleAddChat = () => {
        const newUser = prompt('Type the email: ');

        if (validator.isEmail(newUser)) {
            dispatch(addNewChat(newUser));
        } else {
            console.log('ni de pedo')
        }

    }

    const handleClick = (id, chat) => {
        dispatch(setActiveChat(id, chat));
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
                        chats.map(({ id, users }) => (

                            <ListItemButton key={id} onClick={() => { handleClick(id, { username: users[1] }) }}>
                                <ListItemIcon>
                                    <ChatOutlined />
                                </ListItemIcon> {/* Imagen de la persona del chat */}
                                <Grid container>
                                    <ListItemText primary={users[1]} />
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