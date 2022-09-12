import { Button, Grid, Typography } from '@mui/material'
import React from 'react'



const MainView = () => {

    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', padding: 4, borderRadius: 3 }}
        >
            <Grid container flexDirection={'row'} display={'flex'} flex={1} borderRadius={3} backgroundColor={''} padding={4} marginRight={2}>

                <Grid container sx={{ backgroundColor: '#03dac5', display: 'flex', flex: 2 }} borderRadius={10} >

                    <Grid item padding={4}>
                        <Button onClick={() => { console.log('click'); }} variant='contained' fullWidth>
                            <Typography sx={{ ml: 1 }} variant="div">Proximamente...</Typography>
                        </Button>
                    </Grid>
                </Grid>

                <Grid container sx={{ backgroundColor: 'secondary.main', display: 'flex', flex: 3 }} borderRadius={10} marginLeft={5}>
                    <Grid item padding={4}>
                        <Button onClick={() => { console.log('click'); }} variant='contained' fullWidth>
                            <Typography sx={{ ml: 1 }} variant="div">Proximamente...</Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default MainView