// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/app/slices/counterSlice";
import editNodeReducer from "@/app/slices/editNodeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editNode: editNodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
