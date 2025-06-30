"use client";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import { AiOutlineEdit, AiOutlineGoogle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setEditNode } from "@/app/slices/editNodeSlice";
import { GiFishingNet } from "react-icons/gi";

const Pinecone = ({ id, data }: { id: string; data: any }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative border shadow px-5 py-3 bg-white rounded flex flex-col justify-center items-center">
      <GiFishingNet size={24} />
      <div className="font-bold">Pinecone</div>
      <Handle type="target" position={Position.Top} id="pinecone-input" />
      <Handle type="source" position={Position.Bottom} id="pinecone-embedding">
        embedding
      </Handle>
      <AiOutlineEdit
        className="cursor-pointer absolute top-[-20px] right-0"
        onClick={() => {
          console.log(id);
          dispatch(
            setEditNode({
              type: "pinecone",
              id,
              credentialId: data?.credentialId,
              modelId: data.index,
            })
          );
        }}
      />
    </div>
  );
};

export default Pinecone;
