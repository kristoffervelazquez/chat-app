import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { chatSlice } from "./chats/chatsSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        chats: chatSlice.reducer
    }
})