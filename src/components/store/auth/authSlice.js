import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'not-auth', 'auth'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
        friends: null,
        requests: null,
        sended: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated'; // 'not-auth', 'auth'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'; // 'not-auth', 'auth'
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
            state.friends = null;
            state.requests = null;
            state.sended = null;
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        },
        loadFriends: (state, { payload }) => {
            state.friends = payload;
        },
        loadRequests: (state, {payload}) => {
            state.requests = payload;
        },
        loadSended: (state, {payload}) => {
            state.sended = payload;
        }
    }
})


export const { login, logout, checkingCredentials, loadFriends, loadRequests, loadSended} = authSlice.actions;