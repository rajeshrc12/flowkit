// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/slices/counterSlice";
import editNodeReducer from "@/app/slices/editNodeSlice";
import chatNodeReducer from "@/app/slices/chatNodeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editNode: editNodeReducer,
    chatNode: chatNodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
