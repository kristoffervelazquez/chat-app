import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { CloseOutlined, LogoutOutlined, MenuOutlined, PersonAdd } from '@mui/icons-material'
import { startLogout } from '../../../components/store/auth/thunks'
import { closeActiveChat } from '../../../components/store/chats/thunks';


const NavBar = ({ drawerWidth, setDisplayMenu }) => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.chats)
    


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


                    <Grid>
                        {
                            active ?
                                <IconButton color='error' onClick={() => { dispatch(closeActiveChat()) }}>
                                    <CloseOutlined />
                                </IconButton>
                                :
                                <>
                                    {/* <IconButton onClick={} color='warning'>
                                        <PersonAdd />
                                    </IconButton> */}

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