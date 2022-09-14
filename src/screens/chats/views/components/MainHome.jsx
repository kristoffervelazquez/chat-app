import { Avatar, Badge, Grid, ListItem, Typography } from '@mui/material'
import React from 'react'


const MainHome = ({ username, photoURL }) => {
    
    return (
        <Grid container padding={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} borderRadius={10}>
            <Grid item xs={12} backgroundColor=''>
                <ListItem>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant='standard'
                        badgeContent={''}
                        color='green'
                    >
                        <Avatar sx={{ width: 150, height: 150 }} variant="circular" src={photoURL.toString()} />

                    </Badge>
                    <Typography variant="h2"  sx={{ fontFamily: 'monospace', ml: 1 }}>
                        {username}
                    </Typography>
                    


                </ListItem>
            </Grid>
            <Grid item xs={12} backgroundColor=''>
                <ListItem>
                   
                    {/* <Avatar sx={{ width: 200, height: 200 }} variant="circular" src={'https://scontent.fhmo1-2.fna.fbcdn.net/v/t1.6435-9/83199889_1670786533069331_2259789131460640768_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFx-tMMRfMLpiK6O3cikKqaIvZA45PrVKsi9kDjk-tUq05DAQsw6t56d1A4t23MO_0CakIYolf7GgTlyCqpqmOv&_nc_ohc=Lsq2nhDvYqcAX-oOOTT&tn=CvMj8-1limFiBwgH&_nc_ht=scontent.fhmo1-2.fna&oh=00_AT_3-YRhVIxYsp1UhyL-7WmiX2Ihglex6Q1e-Kuihb-H8g&oe=634685F8'} /> */}
                </ListItem>
            </Grid>

        </Grid>
    )
}

export default MainHome