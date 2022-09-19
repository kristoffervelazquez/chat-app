import { Avatar, Grid, ListItem, Typography } from '@mui/material';
import React from 'react'

const MessagesList = ({conversation, displayName}) => {
    console.log('me llamé')
    return (
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
    )
}

export default MessagesList