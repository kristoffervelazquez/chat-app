import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";


export const theme = createTheme({
    palette: {
        primary: {
            main: '#262254'
        },
        secondary: {
            main: '#543884',
            
        },
        error: {
            main: red.A400
        },
        aqua:{
            main: '#03dac5'
        },
        green: {
            main:'#8AAD34'
        }
        
    }
})
