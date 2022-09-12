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
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', padding: 3, borderRadius: 3 }}

        >
            <Grid container flexDirection={'row'} display={'flex'} flex={1} justifyContent={'space-between'} borderRadius={3} backgroundColor={''} padding={4} marginRight={2}>

                <Grid container justifyContent={'center'} alignItems='center' sx={{ backgroundColor: '#03dac5' }} borderRadius={10} xs={12} sm={3} md={3}>

                    <Grid item padding={4} overflow='hidden'>
                        <Button onClick={() => { console.log('click'); }} variant='contained' fullWidth>
                            <Typography noWrap sx={{ ml: 1 }} variant="div">Proximamente...</Typography>
                        </Button>
                    </Grid>

                </Grid>

                <Grid container justifyContent={'center'} alignItems='center' sx={{ backgroundColor: 'secondary.main' }} borderRadius={10} xs={12} sm={8} md={8}>
                    <Grid item padding={4} overflow='hidden'>
                        <Button onClick={() => { console.log('click'); }} variant='contained' fullWidth>
                            <Typography noWrap sx={{ ml: 1 }} variant="div">Proximamente...</Typography>
                        </Button>
                    </Grid>
                </Grid>




            </Grid>

        </Grid>
    )
}

export default MainView