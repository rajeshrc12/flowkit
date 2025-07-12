import { Node } from "@/types/node";
import { createSlice } from "@reduxjs/toolkit";

interface EditNode {
  type: string | null;
  id: string | null;
}

interface NodeState {
  addNodeModal: Boolean;
  editNode: EditNode;
  nodes: Node[];
}

const initialState: NodeState = {
  nodes: [{ type: "loading", id: "loading", data: {} }],
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
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action) => {
      const { id, data } = action.payload;
      const index = state.nodes.findIndex((node) => node.id === id);
      if (index !== -1) {
        state.nodes[index].data = {
          ...data,
        };
      }
    },
    initNodes: (state, action) => {
      state.nodes = action.payload;
    },
    resetNodes: (state) => {
      state.nodes = [];
    },
  },
});

export const {
  setAddNodeModal,
  resetAddNodeModal,
  setEditNode,
  resetEditNode,
  addNode,
  initNodes,
  resetNodes,
  updateNode,
} = nodeSlice.actions;
export default nodeSlice.reducer;
