import { Handle, Position } from "@xyflow/react";
import React from "react";
import { AiFillOpenAI } from "react-icons/ai";

const OpenAI = () => {
  return (
    <div className="border shadow px-5 py-3 bg-white rounded flex flex-col justify-center items-center">
      <AiFillOpenAI size={24} />
      <div className="font-bold">OpenAI</div>
      <Handle type="target" position={Position.Top} id="openai-input" />
    </div>
  );
};

export default OpenAI;
