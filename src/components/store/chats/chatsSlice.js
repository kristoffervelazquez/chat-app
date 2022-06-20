import { createSlice } from "@reduxjs/toolkit";


export const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        active: null,
        chats: []
    },
    reducers: {
        activeChat: (state, { payload }) => {
            state.active = payload
        },
        newChat: (state, { payload }) => {
            state.chats = [payload, ...state.chats];
        },
        loadChats: (state, { payload }) => {
            state.chats = [payload, ...state.chats];
        }
    }
})


export const { activeChat, newChat } = chatSlice.actions;