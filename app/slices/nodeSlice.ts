import { createSlice } from "@reduxjs/toolkit";
import editNodeSlice from "./editNodeSlice";

interface NodeState {
  addNodeModal: Boolean;
  editNodeModal: Boolean;
}

const initialState: NodeState = {
  addNodeModal: false,
  editNodeModal: false,
};

const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    setAddNodeModal: (state, action) => {
      state.addNodeModal = action.payload;
    },
    resetAddNodeModal: (state) => {
      state.addNodeModal = false;
    },
    setEditNodeModal: (state, action) => {
      state.editNodeModal = action.payload;
    },
    resetEditNodeModal: (state) => {
      state.editNodeModal = false;
    },
  },
});

export const {
  setAddNodeModal,
  resetAddNodeModal,
  setEditNodeModal,
  resetEditNodeModal,
} = nodeSlice.actions;
export default nodeSlice.reducer;
