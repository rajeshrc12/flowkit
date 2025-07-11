"use client";
import { Handle, Position } from "@xyflow/react";
import { AiOutlineEdit, AiOutlineGoogle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setEditNode } from "@/app/slices/editNodeSlice";
const GeminiEmbedding = ({ id, data }: { id: string; data: any }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative border shadow p-5 bg-white rounded-full flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <AiOutlineGoogle size={24} />
        <div className="font-bold">Gemini Embedding</div>
      </div>
      <Handle type="target" position={Position.Top} id="geminiEmbedding" />
      <AiOutlineEdit
        className="cursor-pointer absolute top-[-20px] right-0"
        onClick={() => {
          // console.log(id);
          dispatch(
            setEditNode({
              type: "geminiEmbedding",
              id,
              credentialId: data.credentialId,
              modelId: data.modelId,
            })
          );
        }}
      />
    </div>
  );
};

export default GeminiEmbedding;
