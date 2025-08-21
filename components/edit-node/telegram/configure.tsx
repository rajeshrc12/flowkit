import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Configure = ({ data, setData }: { data: any; setData: any }) => {
  const { data: chats, isLoading } = useSWR(
    data?.type ? `/api/telegram/bot/${data?.account}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0, // No polling
    }
  );
  console.log(chats);
  return (
    <div className="text-sm">
      <div className="flex flex-col gap-2">
        <div>Chat ID</div>
        <Select
          value={data?.chatId || ""}
          onValueChange={(value) =>
            setData({
              ...data,
              chatId: String(value),
              response: chats?.result,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select worksheet" />
          </SelectTrigger>
          <SelectContent>
            {!isLoading &&
              chats?.result?.map((chat: any) => (
                <SelectItem key={chat.update_id} value={String(chat.update_id)}>
                  {chat.message.chat.first_name} {chat.message.chat.last_name} (
                  {chat.message.chat.type})
                  <span>ID:{chat.message.chat.id}</span>
                </SelectItem>
              ))}
            {!chats?.result?.length && (
              <SelectItem value="no_data">No data</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Configure;
