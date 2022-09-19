import React, { useState } from 'react'
import { Grid, FormControl, IconButton, TextField, } from '@mui/material'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import SendIcon from '@mui/icons-material/Send';
import { FileUploadTwoTone } from "@mui/icons-material";
import { db } from '../../../../firebase/firebaseConfig';
import { useSelector } from 'react-redux';



const BottomBar = () => {
    const { active } = useSelector(state => state.chats);
    const { displayName, photoURL } = useSelector(state => state.auth);
    const {id} = active;
    const [message, setMessage] = useState('');

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
        <>
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
        </>
    )
}

export default BottomBar