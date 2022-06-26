import { useEffect, useRef, useState } from "react";
import { addDoc, collection, doc, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { Avatar, Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from '@mui/icons-material/Send';
import { FileUploadTwoTone } from "@mui/icons-material";
import { db } from "../../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import './Chat.css';
import moment from "moment";




const ChatView = () => {

    const { active } = useSelector(state => state.chats);
    const { displayName, photoURL } = useSelector(state => state.auth);
    const [message, setMessage] = useState('');
    const { id } = active;

    const q = query(collection(db, `chats/${id}/conversation`), orderBy("timestamp"));
    const [conversation] = useCollectionData(q);
    const bottomOfChat = useRef();
    const last24HoursMessages = conversation?.filter(msg => (msg.timestamp?.seconds) > ((Date.now() / 1000) - 86400))





    const getMessages = () =>

        last24HoursMessages?.map(msg => {
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

    const sendMessage = async (text) => {

        await addDoc(collection(db, `chats/${id}/conversation`), {
            sender: displayName,
            message: text,
            senderPhoto: photoURL ? photoURL : 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-14.jpg',
            timestamp: serverTimestamp()
        });
        setMessage('');
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim().length <= 0) return;

        sendMessage(message);

    }

    return (
        <Container className='animate__animated animate__fadeIn animate__faster'>
            <Box p={3}>
                <Divider />
                <Grid container spacing={4} alignItems="center">
                    <Grid id="chat-window" xs={12} item>
                        <List id="chat-window-messages">
                            {getMessages()}
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

                    <Grid xs={10} item>
                        <form onSubmit={handleSendMessage} action="">

                            <FormControl fullWidth>
                                <TextField
                                    label="Type your message..."
                                    variant="outlined"
                                    autoComplete="off"
                                    value={message}
                                    onChange={(e) => { setMessage(e.target.value) }} />
                            </FormControl>
                        </form>
                    </Grid>
                    <Grid xs={1} item>
                        <IconButton
                            aria-label="file"
                            color="primary">
                            <FileUploadTwoTone />
                        </IconButton>
                    </Grid>
                    <Grid xs={1} item>
                        <IconButton
                            onClick={handleSendMessage}
                            aria-label="send"
                            color="primary"
                            type='submit'
                        >
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Container>


    )
}

export default ChatView