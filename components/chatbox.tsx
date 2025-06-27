import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { resetChatNode, setChatNode } from "@/app/slices/chatNodeSlice";
import axios from "axios";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

const Chatbox = () => {
  const { workflowId } = useParams();
  const chatNode = useSelector((state: RootState) => state.chatNode);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<{ role: string; parts: [string] }[]>([]);
  const [isChatsLoading, setIssChatsLoading] = useState(false);
  const clearData = () => {
    dispatch(resetChatNode());
    setChats([]);
    setMessage("");
    setIssChatsLoading(false);
  };
  useEffect(() => {
    return () => {
      clearData();
    };
  }, []);
  const sendMessage = async () => {
    if (message.trim() !== "") {
      const tempChat = JSON.parse(
        JSON.stringify([...chats, { role: "user", parts: [message] }])
      );
      setChats(tempChat);
      setIssChatsLoading(true);
      setMessage("");
      const response = await axios.post("/api/python", {
        message,
        workflowId,
        chat_message: chats,
      });
      console.log(response.data);
      setChats(response.data);
      setIssChatsLoading(false);
    }
  };
  if (chatNode.chat)
    return (
      <div className="relative w-[500px] h-full border-l">
        <Button className="absolute top-0 left-[-50px]" onClick={clearData}>
          <IoMdClose size={20} />
        </Button>
        <div className="h-[90%] flex flex-col overflow-y-scroll py-2 gap-1">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`flex gap-2 ${
                chat.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="px-2 py-1 rounded border max-w-[200px] break-words prose prose-sm">
                <ReactMarkdown>{chat.parts.join("")}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isChatsLoading && (
            <div className={`flex gap-2 justify-start`}>
              <div className="px-2 py-1 rounded border max-w-[200px] word-break break-all">
                ...
              </div>
            </div>
          )}
        </div>
        <div className="h-[10%] flex gap-2 p-2">
          <Input
            placeholder="Ask a question..."
            className="h-full w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <Button onClick={sendMessage} className="h-full p-2">
            <SendIcon />
          </Button>
        </div>
      </div>
    );
};

export default Chatbox;
