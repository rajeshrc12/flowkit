import { Handle, Position } from "@xyflow/react";
import { BotIcon } from "lucide-react";
import React from "react";

const Agent = () => {
  return (
    <div className="border shadow px-5 py-3 w-[200px] bg-white rounded flex flex-col justify-center items-center">
      <BotIcon size={24} />
      <div className="font-bold">Agent</div>
      <Handle type="target" position={Position.Left} id="agent-input" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="agent-model"
        style={{ marginLeft: "-50px" }}
      >
        model
      </Handle>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ marginLeft: "50px" }}
        id="agent-pinecone"
      >
        tool
      </Handle>
    </div>
  );
};

export default Agent;
