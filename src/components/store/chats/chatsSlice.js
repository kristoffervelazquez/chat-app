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

            if (state.chats.some(e => e.id === payload.id)) {
                return;
            }
            state.chats = [...state.chats, payload];


        },
        closeChat: (state) => {
            state.active = null;
        },
        loadConversation: (state, { payload }) => {

            state.chats.forEach((chat, index) => {
                if (chat.id === payload.id) {
                    state.chats[index] = { ...state.chats[index], conversation: payload.conversation };
                }

            })

        }
    }
})


export const { activeChat, newChat, closeChat, loadChats, loadConversation } = chatSlice.actions;