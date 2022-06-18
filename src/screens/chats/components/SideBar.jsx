import { ChatOutlined } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"


const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector(state => state.auth);

    const chats = [{ id: 1, username: 'Hanna', msg: 'holaaaa comostas?', time: 1231231231 }, { id: 2, username: 'Shimuelo', msg: 'atun porfavor', time: 1286231231 }, { id: 3, username: 'Gorda', msg: 'poio pls ase ambre', time: 1686731231 }]

    return (
        <Box
            component='nav'
            sx={{ sm: drawerWidth, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent' // temporary
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >

                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        chats.map(({ id, username, msg, time }) => (

                            <ListItemButton key={id}>
                                <ListItemIcon>
                                    <ChatOutlined />
                                </ListItemIcon> {/* Imagen de la persona del chat */}
                                <Grid container>
                                    <ListItemText primary={username} />
                                    <ListItemText secondary={`${msg} ${time}`} />
                                </Grid>
                            </ListItemButton>


                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}

export default SideBar