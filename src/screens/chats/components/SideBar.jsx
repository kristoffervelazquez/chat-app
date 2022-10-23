import { useSelector, useDispatch } from "react-redux"
import { ArrowBack } from "@mui/icons-material"
import { Box, Divider, Drawer, ListItemButton, List, ListItemText, Toolbar, Typography, IconButton, ListItemAvatar, Avatar } from "@mui/material"
import { setActiveChat } from "../../../components/store/chats/thunks";
import { useEffect } from "react";
import { useState } from "react";
import { loadUserInformation } from "../../../helpers/loadUserInformation";




const SideBar = ({ drawerWidth, displayMenu, setDisplayMenu }) => {

    const dispatch = useDispatch()
    const { displayName, email, uid } = useSelector(state => state.auth);
    const { chats } = useSelector(state => state.chats);
    const [visible, setVisible] = useState(false);


    const handleClick = (id, chat) => {
        dispatch(setActiveChat(id, chat));
        setDisplayMenu(false);
    }

    

    const handleDate = (date) => {
        const fecha = new Date(date * 1000)
        return `${fecha.toLocaleString()}`;
    }

    useEffect(() => {       

        if (chats.length >= 1) {
            setVisible(true);
        }

    }, [chats])



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
                    <Typography variant='h6' noWrap component='div'>Chats</Typography>

                </Toolbar>
                <Divider />
                {
                    visible &&
                    <List sx={{ width: '100%', maxWidth: 240, overflow: 'hidden', scrollbarWidth: 'none', overflowY: 'scroll', }}>
                        {

                            chats?.map(({ id, data, conversation, userToDisplay, pictureUrl }, idx) => (
                                conversation &&
                                <div key={id}>
                                    <ListItemButton alignItems="flex-start" onClick={() => { handleClick(id, { username: userToDisplay }) }}>
                                        <ListItemAvatar>
                                            <Avatar alt={userToDisplay} src={pictureUrl} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body1"
                                                    color="text.primary"
                                                >
                                                    {userToDisplay}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {/* LastSender */}
                                                        {
                                                            conversation &&
                                                            conversation.length > 0 &&
                                                            `${conversation[conversation.length - 1].sender}: `

                                                        }

                                                    </Typography>
                                                    {
                                                        conversation.length > 0 &&
                                                        `${conversation[conversation.length - 1].message} ${handleDate(conversation[conversation.length - 1].timestamp)} `
                                                    }
                                                </>
                                            }
                                        />
                                    </ListItemButton>
                                    <Divider variant="inset" component="li" />
                                </div>

                            ))
                        }
                    </List>
                }
            </Drawer>
        </Box>
    )
}

export default SideBar
// <ListItemButton key={id} onClick={() => { handleClick(id, { username: displayUser(users) }) }}>
//     <ListItemIcon>
//         <ChatOutlined />
//     </ListItemIcon> {/* Imagen de la persona del chat */}
//     <Grid container>
//         <ListItemText primary={displayUser(users)} />
//         {/* <ListItemText secondary={`${msg} ${time}`} /> */}
//     </Grid>
// </ListItemButton>