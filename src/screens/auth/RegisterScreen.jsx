
import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Grid, Typography, TextField, Button, Link } from "@mui/material"
import AuthLayout from './layout/AuthLayout'

const RegisterScreen = () => {
    return (
        <AuthLayout title="Create account">
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Name"
                            type="name"
                            placeholder="Chris Williams"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="email@email.com"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="password"
                            placeholder="Password"
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm Password"
                            fullWidth
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

                        <Grid item xs={12} sm={6}>
                            <Button variant='contained' fullWidth>
                                Register
                            </Button>
                        </Grid>


                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{mr:1}}>Already have an account?</Typography>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            Go to Login!
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}

export default RegisterScreen