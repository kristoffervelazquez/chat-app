import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'not-auth', 'auth'
        uid: null,
        email: null,
        displayName: null,
        photoUrl: null,
        errorMessage: null
    },
    reducers: {
        login: (state, action) => {

        },
        logout: (state, payload) => {

        },
        checkingCredentials: (state) => {

        }

    }
})


export const {login, logout, checkCredentials} = authSlice.actions;