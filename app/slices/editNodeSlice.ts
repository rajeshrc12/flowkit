// slices/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface EditNodeState {
  type: string | boolean;
  id: string | null;
}

const initialState: EditNodeState = {
  type: false,
  id: null,
};

const editNodeSlice = createSlice({
  name: "editNode",
  initialState,
  reducers: {
    setEditNode: (state, action) => {
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    reset: (state) => {
      state.type = false;
      state.id = null;
    },
  },
});

export const { setEditNode, reset } = editNodeSlice.actions;
export default editNodeSlice.reducer;
