import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Avatar, Box, Button, ClickAwayListener, Divider, Grid, IconButton, List, ListItem, Modal, Portal, Toolbar, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { CloseOutlined, LogoutOutlined, MenuOutlined, PersonAdd } from '@mui/icons-material'
import { startLogout } from '../../../../components/store/auth/thunks'
import { closeActiveChat } from '../../../../components/store/chats/thunks';
import { useState } from 'react'
import UserRequestItem from './components/UserRequestItem'


const NavBar = ({ drawerWidth, setDisplayMenu }) => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.chats)
    const { requests } = useSelector(state => state.auth);


    const [activeButton, setActiveButton] = useState(false);



    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to log out?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, I want to sign out!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startLogout());
            }
        })
    }



    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuOutlined />
                </IconButton>

                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <IconButton onClick={() => { setDisplayMenu(true) }} color='warning'>
                        <MenuOutlined />
                    </IconButton>
                    {
                        active &&

                        <Grid item display={'flex'} flex={1} justifyContent='center' flexDirection={'row'}>

                            <Typography variant='h6' noWrap component='div'> {active.chat.username} </Typography>

                            <Grid paddingLeft={10}>
                                <IconButton onClick={() => { console.log('Añadir personas a un grupo'); }} color='warning'>
                                    <PersonAdd />
                                </IconButton>
                            </Grid>
                        </Grid>


                    }


                    <Grid display={'flex'} flexDirection={'row'}>
                        {
                            active ?
                                <IconButton color='error' onClick={() => { dispatch(closeActiveChat()) }}>
                                    <CloseOutlined />
                                </IconButton>
                                :
                                <>


                                    <IconButton color='warning' onClick={() => { setActiveButton(true) }}>
                                        <PersonAdd />
                                    </IconButton>
                                    <Modal
                                        style={{ alignItems: "center", justifyContent: "center", display: 'flex' }}

                                        open={activeButton}
                                        onClose={() => { setActiveButton(false) }}
                                        aria-labelledby="parent-modal-title"
                                        aria-describedby="parent-modal-description"
                                    >
                                        <Box sx={{ backgroundColor: '#262254', borderRadius: 5, padding: 5 }}>


                                            <Box sx={{ backgroundColor: 'white', borderRadius: 5, padding: 5 }}>
                                                <h2>Friend requests</h2>
                                                <p>
                                                    Do you know this users?
                                                    You can accept or delete these friend requests
                                                </p>

                                                <List >
                                                    {
                                                        requests?.map(request => (
                                                            <div key={request.id}>
                                                                <UserRequestItem name={request.name} photo={request.photo} id={request.id}/>
                                                                <Divider />
                                                            </div>

                                                        ))
                                                    }
                                                </List>

                                            </Box>
                                        </Box>
                                    </Modal>

                                    {/* <ClickAwayListener onClickAway={() => { setActiveButton(false) }}>

                                        <Box sx={{ position: 'relative' }}>
                                            {activeButton ? (
                                                <Portal>
                                                    <Box sx={{ border: 1, p: 1, bgcolor: 'black' }}>
                                                        Click me, I will stay visible until you click outside.
                                                    </Box>
                                                </Portal>
                                            ) : null}
                                        </Box>

                                    </ClickAwayListener> */}

                                    <IconButton onClick={handleLogout} color='error'>
                                        <LogoutOutlined />
                                    </IconButton>
                                </>
                        }
                    </Grid>

                </Grid>

            </Toolbar>
        </AppBar>
    )
}

export default NavBar;