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
import { Textarea } from "@/components/ui/textarea";

const Configure = ({ data, setData }: { data: any; setData: any }) => {
  const { data: usernames, isLoading } = useSWR(
    data.account ? `/api/slack/username` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );
  console.log(usernames);
  return (
    <div className="flex flex-col text-sm gap-4">
      {/* Spreadsheet Select */}
      <div className="flex flex-col gap-2">
        <div>Username</div>
        <Select
          value={data?.username}
          onValueChange={(value) =>
            setData({
              ...data,
              username: value,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select username" />
          </SelectTrigger>
          <SelectContent>
            {isLoading && (
              <SelectItem value="__loading_spreadsheet" disabled>
                Loading...
              </SelectItem>
            )}
            {usernames &&
              !isLoading &&
              usernames?.map((user: any) => (
                <SelectItem key={user.id} value={user.slackUserId}>
                  {user.name}
                  <span className="ml-2 text-xs text-gray-500">
                    {user.email}
                  </span>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <div>Message text</div>
        <Textarea
          value={data?.messageText}
          onChange={(e) =>
            setData({
              ...data,
              messageText: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default Configure;
