import { Avatar, Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';
import { FileUploadTwoTone } from "@mui/icons-material";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { addDoc, collection, doc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { useState } from "react";



const ChatView = () => {

    const { active } = useSelector(state => state.chats);
    const { email, displayName, photoURL } = useSelector(state => state.auth);
    const [message, setMessage] = useState('');

    const { id } = active;
    const [chat] = useDocumentData(doc(db, "chats", id));
    const q = query(collection(db, `chats/${id}/conversation`), orderBy("timestamp"));
    const [conversation] = useCollectionData(q);
    const bottomOfChat = useRef();



    const getMessages = () =>
        conversation?.map(msg => {
            const sender = msg.sender === displayName;
            return (
                <Grid key={Math.random()} >
                    <ListItem sx={{ display: 'flex', maxWidth: 'fit-content', fontSize: '20px', background: sender ? 'green' : '#304D63', mb: 1, borderRadius: '20px', marginRight: sender && '0px', marginLeft: sender && 'auto' }}>
                        <Avatar variant="circular" src={msg.senderPhoto} />
                        <Typography sx={{ml: '10px', fontWeight: 'thin'}} variant="p">{msg.message}</Typography>
                        
                    </ListItem>
                </Grid>
            );
        })

    // useEffect(() =>
    //     setTimeout(
    //         bottomOfChat.current.scrollIntoView({
    //             behavior: "smooth",
    //             block: 'start',
    //         }), 100)
    //     , [conversation]);

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