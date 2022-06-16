import { Button, Grid, TextField, Typography } from "@mui/material"


const ChatView = () => {
    return (
        <Grid container direction="row" justifyContent='space-between' sx={{ mb: 1 }}>
            
            <form className="chat-form"> 
                <Grid container direction="row" justifyContent='space-between' sx={{ mb: 1}}>
                    <TextField type="text" variant="filled" fullWidth label="Write your message" sx={{ border: 'none', mt: 1 }} />
                </Grid>
            </form>

        </Grid>
    )
}

export default ChatView