import { Container, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import './Chat.css';
import SendIcon from '@mui/icons-material/Send';
import { FileUploadTwoTone } from "@mui/icons-material";


const ChatView = () => {

    return (
        <Container className='animate__animated animate__fadeIn animate__faster'>
            <Box p={3}>
                <Divider />
                <Grid container spacing={4} alignItems="center">
                    <Grid id="chat-window" xs={12} item>
                        <List id="chat-window-messages">
                            <ListItem></ListItem>
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
                                variant="outlined" />
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