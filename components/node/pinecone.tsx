import { Handle, Position } from "@xyflow/react";
import React from "react";

const Pinecone = () => {
  return (
    <div className="bg-white p-5 border shadow">
      <div className="font-bold">Pinecone</div>
      <Handle type="target" position={Position.Top} id="pinecone-input" />
    </div>
  );
};

export default Pinecone;
