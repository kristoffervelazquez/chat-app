import React from 'react'
import { Avatar, Button, Grid, ListItem, Typography } from '@mui/material'

const UserRequestItem = ({name, photo}) => {
    return (
        <ListItem display='flex' sx={{ justifyContent: 'space-between' }}>

            <Avatar sx={{ width: 50, height: 50 }} variant="circular" src={photo} />
            <Typography variant="h5" sx={{ fontFamily: 'monospace', marginX: 5 }}>
                {name}
            </Typography>
            <Grid item display='flex' justifyContent={'space-evenly'} flex={1}>
                <Button variant='contained'  >
                    <Typography variant="div">Accept</Typography>
                </Button>
                <Button variant='outlined' color='warning' >
                    <Typography variant="div">Delete</Typography>
                </Button>
            </Grid>
        </ListItem>
    )
}

export default UserRequestItem