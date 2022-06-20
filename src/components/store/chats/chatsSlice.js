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
        addNewChat: (state, { payload }) => {
            state.chats =  [payload, ...state.chats];
        }
    }
})


export const { activeChat, addNewChat } = chatSlice.actions;