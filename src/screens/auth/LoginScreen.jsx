
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { Google } from "@mui/icons-material"

import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../components/store/auth/thunks'
import AuthLayout from './layout/AuthLayout'
import { useForm } from '../../hooks/useForm/useForm'
import { useMemo } from 'react'


const LoginScreen = () => {

    const { status, errorMessage } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const { email, password, onInputChange } = useForm({
        email: '',
        password: ''
    });

    const isAuthenticating = useMemo(() => status === 'checking', [status]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailAndPassword({ email, password }));
    }

    const handleGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={handleSubmit} className='animate__animated animate__bounceIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            placeholder="email@email.com"
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}

                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Password"
                            type="Password"
                            placeholder="password"
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

                        <Grid item xs={12} sm={12} display={!!errorMessage ? '' : 'none'}>
                            <Alert severity='error'>{errorMessage}</Alert>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button disabled={isAuthenticating} type="submit" variant='contained' fullWidth>
                                Login
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Button disabled={isAuthenticating} onClick={handleGoogleSignIn} variant='contained' fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }} variant="div">Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }}>Not register yet?</Typography>
                        <Link component={RouterLink} color='inherit' to='/auth/register'>
                            Create account!
                        </Link>
                    </Grid>
                </Grid>
            </form>

        </AuthLayout >


    )
}

export default LoginScreen