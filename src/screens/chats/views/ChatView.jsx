import { Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';
import { FileUploadTwoTone } from "@mui/icons-material";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { collection, doc, orderBy, query, onSnapshot } from "firebase/firestore";
import { useRef } from "react";
import { useState } from "react";


const ChatView = () => {

    const { active } = useSelector(state => state.chats);
    const { email } = useSelector(state => state.auth);
    const [message, setMessage] = useState('');

    const { id } = active;
    const [chat] = useDocumentData(doc(db, "chats", id));
    const q = query(collection(db, `chats/${id}/conversation`), orderBy("timestamp"));
    const [conversation] = useCollectionData(q);
    const bottomOfChat = useRef();



    const getMessages = () =>
        conversation?.map(msg => {
            const sender = msg.sender === email;
            return (
                <Grid key={Math.random()} >
                    <ListItem sx={{ fontSize: '24px', background: 'blue', mb: 1, overflow: 'none' }}>
                        {`${msg.sender}: ${msg.message}`}
                    </ListItem>
                </Grid>
            )
        })

    // useEffect(() =>
    //     setTimeout(
    //         bottomOfChat.current.scrollIntoView({
    //             behavior: "smooth",
    //             block: 'start',
    //         }), 100)
    //     , [conversation]);


    const handleSendMessage = () => {

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
                        <FormControl fullWidth>
                            <TextField
                                label="Type your message..."
                                variant="outlined"
                                value={message}
                                onChange={setMessage} />
                        </FormControl>
                    </Grid>
                    <Grid xs={1} item>
                        <IconButton
                            aria-label="emoji"
                            color="primary">
                            <FileUploadTwoTone />
                        </IconButton>
                    </Grid>
                    <Grid xs={1} item>
                        <IconButton
                            onClick={handleSendMessage}
                            aria-label="send"
                            color="primary">
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Container>


    )
}

export default ChatView