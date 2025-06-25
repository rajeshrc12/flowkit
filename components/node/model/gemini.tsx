"use client";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import { AiOutlineEdit, AiOutlineGoogle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setEditNode } from "@/app/slices/editNodeSlice";
const Gemini = ({ id, data }: { id: string; data: any }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative border shadow px-5 py-3 bg-white rounded flex flex-col justify-center items-center">
      <AiOutlineGoogle size={24} />
      <div className="font-bold">Gemini</div>
      <Handle type="target" position={Position.Top} id="gemini-input" />
      <AiOutlineEdit
        className="cursor-pointer absolute top-[-20px] right-0"
        onClick={() => {
          console.log(id);
          dispatch(
            setEditNode({ type: "gemini", id, credentialId: data.credentialId })
          );
        }}
      />
    </div>
  );
};

export default Gemini;
