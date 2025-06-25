import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";

const Chatbox = () => {
  const chatNode = useSelector((state: RootState) => state.chatNode);
  const [message, setMessage] = React.useState("");
  const [chats, setChats] = React.useState<string[]>([]);
  console.log(chatNode);
  if (chatNode.chat)
    return (
      <div className="w-[500px] h-full border-l">
        <div className="h-[90%] flex flex-col-reverse overflow-y-scroll py-2 gap-1">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`flex gap-2 ${
                chat === "l" ? "justify-start" : "justify-end"
              }`}
            >
              <div className="p-2 rounded border max-w-[200px] word-break break-all">
                {chat}
              </div>
            </div>
          ))}
        </div>
        <div className="h-[10%] flex gap-2 p-2">
          <Input
            placeholder="Ask a question..."
            className="h-full w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && message.trim() !== "") {
                setChats([message, ...chats]);
                setMessage("");
              }
            }}
          />
          <Button
            onClick={() => {
              if (message.trim() !== "") {
                setChats([message, ...chats]);
                setMessage("");
              }
            }}
            className="h-full p-2"
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    );
};

export default Chatbox;
