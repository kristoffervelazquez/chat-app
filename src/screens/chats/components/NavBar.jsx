import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { startLogout } from '../../../components/store/auth/thunks'
import { useDispatch, useSelector } from 'react-redux'


const NavBar = ({ drawerWidth = 240 }) => {


    const { active } = useSelector(state => state.chats)

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(startLogout());
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