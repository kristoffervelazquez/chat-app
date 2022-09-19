import React, { useEffect, useRef } from "react";
import { Avatar, Container, Divider, Grid,  List, ListItem,  Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import MessagesList from "./components/MessagesList";
import BottomBar from "./components/BottomBar";
import './Chat.css';



const ChatView = () => {

    const { active, chats } = useSelector(state => state.chats);
    const { displayName } = useSelector(state => state.auth);
    const { id } = active;
    const index = chats.map(chat => chat.id).indexOf(id);
   
    const conversation = chats[index].conversation;
    const bottomOfChat = useRef();


    // const q = query(collection(db, `chats/${id}/conversation`), orderBy("timestamp"), limitToLast(100));
    // const [conversation] = useCollectionData(q);
    // const last24HoursMessages = conversation?.filter(msg => (msg.timestamp?.seconds) > ((Date.now() / 1000) - 86400))
    
    


    const getMessages = () =>

        conversation?.map(msg => {
            const sender = msg.sender === displayName;
            return (
                <Grid key={Math.random()} >
                    <ListItem sx={{ display: 'flex', maxWidth: 'fit-content', fontSize: '20px', background: sender ? 'green' : '#304D63', mb: 1, borderRadius: '20px', marginRight: sender && '0px', marginLeft: sender && 'auto' }}>
                        <Avatar variant="circular" src={msg.senderPhoto} />
                        <Typography sx={{ ml: '10px', fontWeight: 'thin' }} variant="p">{msg.message}</Typography>
                    </ListItem>
                </Grid>
            );
        })

    useEffect(() =>

        bottomOfChat.current.scrollIntoView({
            behavior: "smooth",
            block: 'start',
        })
        , [conversation]);



    return (
        <Container className='animate__animated animate__fadeIn animate__faster'>
            <Box p={3}>
                <Divider />
                <Grid container spacing={4} alignItems="center">
                    <Grid id="chat-window" xs={12} item>
                        <List id="chat-window-messages">
                            <MessagesList conversation={conversation} displayName={displayName}/>
                            <div ref={bottomOfChat}></div>
                        </List>
                    </Grid>
                    {/* <Grid xs={2} item>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Nickname"
                                        variant="outlined" />
                                </FormControl>
                            </Grid> */}
                    <BottomBar />
                    
                </Grid>
            </Box>
        </Container>


    )
}

export default ChatView