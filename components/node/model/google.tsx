import { Handle, Position } from "@xyflow/react";
import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";

const Google = () => {
  return (
    <div className="border shadow px-5 py-3 bg-white rounded flex flex-col justify-center items-center">
      <AiOutlineGoogle size={24} />
      <div className="font-bold">Google</div>
      <Handle type="target" position={Position.Top} id="google-top" />
    </div>
  );
};

export default Google;
