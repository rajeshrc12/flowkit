// slices/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface ChatNodeState {
  chat: boolean;
}

const initialState: ChatNodeState = {
  chat: false,
};

const chatNodeSlice = createSlice({
  name: "chatNode",
  initialState,
  reducers: {
    setChatNode: (state, action) => {
      state.chat = action.payload.chat;
    },
    resetChatNode: (state) => {
      state.chat = false;
    },
  },
});

export const { setChatNode, resetChatNode } = chatNodeSlice.actions;
export default chatNodeSlice.reducer;
