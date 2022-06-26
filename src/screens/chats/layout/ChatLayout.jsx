import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { useState } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';


export const ChatLayout = ({ children }) => {

    const [displayMenu, setDisplayMenu] = useState(false)
    
    const drawerWidth = displayMenu ? 240 : 0;

    return (
        <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

            <NavBar drawerWidth={drawerWidth} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} />

            <SideBar drawerWidth={drawerWidth} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu}/>

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}
                onClick={() => {console.log('first')}}
            >
                <Toolbar />
                {children}

            </Box>
        </Box >
    )
}

export default ChatLayout