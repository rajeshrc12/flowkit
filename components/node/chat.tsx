import { Handle, Position } from "@xyflow/react";
import { FiMessageCircle } from "react-icons/fi";
import React from "react";
import { useDispatch } from "react-redux";
import { setChatNode } from "@/app/slices/chatNodeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { IoMdOpen } from "react-icons/io";

const Chat = () => {
  const dispatch = useDispatch();
  const chatNode = useSelector((state: RootState) => state.chatNode);
  return (
    <div className="border shadow px-5 py-3 bg-white rounded flex flex-col justify-center items-center">
      <FiMessageCircle size={24} />
      <div className="font-bold">Chat</div>
      <Handle type="source" position={Position.Right} id="chat-output" />
      <IoMdOpen
        className="cursor-pointer absolute top-[-20px] right-0"
        onClick={() => {
          dispatch(setChatNode({ chat: !chatNode.chat }));
        }}
      />
    </div>
  );
};

export default Chat;
