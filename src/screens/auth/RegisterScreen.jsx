
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import AuthLayout from './layout/AuthLayout'
import { useForm } from '../../hooks/useForm/useForm'
import { startCreateWithEmailAndPassword } from '../../components/store/auth/thunks'


const formData = {
    email: '',
    password: '',
    displayName: ''
}
const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth)
    const [error, setError] = useState({ mensaje: '', error: null })

    const { displayName, email, password, onInputChange, formState } = useForm(formData);

    const isCheckingAuth = useMemo(() => status === 'checking', [status])


    const isFormValid = () => {
        if (displayName.trim().length === 0) {
            setError({ mensaje: 'Name is required', error: true });
            return false;
        } else if (!validator.isEmail(email)) {
            setError({ mensaje: 'Email is not valid', error: true });
            return false;
        } else if (!validator.isStrongPassword(password, { minSymbols: 0 })) {
            setError({ mensaje: 'Weak password, try with other', error: true });
            return false;
        }
        else {
            setError({ mensaje: '', error: null });
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            // Paso validacion
            dispatch(startCreateWithEmailAndPassword(formState))

        }

    }

    return (
        <AuthLayout title="Create account">
            <form onSubmit={handleSubmit} className='animate__animated animate__bounceIn animate__faster'>
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label="Name"
                            type="name"
                            placeholder="Chris Williams"
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                        />
                    </Grid>

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
                            type="password"
                            placeholder="Password"
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                        />
                    </Grid>


                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        
                            
                            <Grid item xs={12} sm={12} display={error.error || !!errorMessage ? '' : 'none'}>
                                <Alert severity='error'>{error.mensaje || errorMessage}</Alert>
                            </Grid>
                        

                        <Grid item xs={12} sm={12}>
                            <Button type="submit" variant='contained' fullWidth>
                                Register
                            </Button>
                        </Grid>


                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
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