// slices/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface EditNodeState {
  type: string | boolean;
  id: string | null;
  credentialId: string | null;
}

const initialState: EditNodeState = {
  type: false,
  id: null,
  credentialId: null,
};

const editNodeSlice = createSlice({
  name: "editNode",
  initialState,
  reducers: {
    setEditNode: (state, action) => {
      if (Object.keys(action.payload).includes("type"))
        state.type = action.payload.type;
      if (Object.keys(action.payload).includes("id"))
        state.id = action.payload.id;
      if (Object.keys(action.payload).includes("credentialId"))
        state.credentialId = action.payload.credentialId;
    },
    resetEditNode: (state) => {
      state.type = false;
      state.id = null;
      state.credentialId = null;
    },
  },
});

export const { setEditNode, resetEditNode } = editNodeSlice.actions;
export default editNodeSlice.reducer;
