import { createSlice } from "@reduxjs/toolkit";

interface EditNode {
  type: string | null;
  id: string | null;
}

interface NodeState {
  addNodeModal: Boolean;
  editNode: EditNode;
}

const initialState: NodeState = {
  addNodeModal: false,
  editNode: { type: null, id: null },
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
    setEditNode: (state, action) => {
      state.editNode = action.payload;
    },
    resetEditNode: (state) => {
      state.editNode = { type: null, id: null };
    },
  },
});

export const {
  setAddNodeModal,
  resetAddNodeModal,
  setEditNode,
  resetEditNode,
} = nodeSlice.actions;
export default nodeSlice.reducer;
