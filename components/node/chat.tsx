import { Handle, Position } from "@xyflow/react";
import { MessageCircleIcon } from "lucide-react";
import React from "react";

const Chat = () => {
  return (
    <div className="border shadow px-5 py-3 bg-white rounded flex flex-col justify-center items-center">
      <MessageCircleIcon size={24} />
      <div className="font-bold">Chat</div>
      <Handle type="source" position={Position.Right} id="chat-right" />
    </div>
  );
};

export default Chat;
