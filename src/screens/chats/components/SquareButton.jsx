import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

const SquareButton = ({ text, Icon, callback, color = 'primary',  }) => {
    return (
        <Button sx={{ height: 170, borderRadius: 5 }} color={color} onClick={callback} variant='contained' fullWidth>
            <Grid container justifyContent='center' alignItems={'center'}>
                <Typography  sx={{ ml: 1, }} variant="div">{text}</Typography>
                {
                    Icon &&
                    <Grid marginTop={1}>
                        <Icon />
                    </Grid>
                }
            </Grid>
        </Button>
    )
}

export default SquareButton