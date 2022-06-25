import { useDispatch, useSelector } from 'react-redux'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { startLogout } from '../../../components/store/auth/thunks'


const NavBar = ({ drawerWidth = 240 }) => {


    const { active } = useSelector(state => state.chats)

    const dispatch = useDispatch();

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
                    {
                        active &&
                        <Typography variant='h6' noWrap component='div'> {active.chat.username} </Typography>
                    }

                    <IconButton onClick={handleLogout} color='error'>
                        <LogoutOutlined />
                    </IconButton>

                </Grid>

            </Toolbar>
        </AppBar>
    )
}

export default NavBar;