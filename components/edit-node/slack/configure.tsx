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
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function transformMessage(str: string) {
  // Replace {"key":"value"} with key : value
  // return str.replace(/\{ *"[^"]+" *: *"([^"]+)" *\}/g, '$1');
  return str.replace(/\{ *"([^"]+)" *: *"([^"]+)" *\}/g, "$1 : $2");
}

const Configure = ({ data, setData }: { data: any; setData: any }) => {
  const node = useSelector((state: RootState) => state.node);
  const [popoverData, setPopoverData] = React.useState<any>(null);
  const { data: usernames, isLoading } = useSWR(
    data.account ? `/api/slack/username` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
    }
  );
  console.log(popoverData);
  return (
    <div className="flex flex-col text-sm gap-4">
      {/* Spreadsheet Select */}
      <div className="flex flex-col gap-2">
        <div>Username</div>
        <Select
          value={data?.username || ""}
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
      <div className="flex flex-col gap-2 items-end">
        <div className="flex justify-between items-center w-full">
          <div>Message text</div>
        </div>
        <Textarea
          className="text-sm"
          value={data?.messageText || ""}
          onChange={(e) =>
            setData({
              ...data,
              messageText: e.target.value,
            })
          }
        />
        <Popover>
          <PopoverTrigger
            onClick={() => {
              const nodeIndex = node.nodes.findIndex(
                (n: any) => n.id === node.editNode.id
              );
              const prevNode = node.nodes[nodeIndex - 1] as any;
              setPopoverData(prevNode);
              console.log(prevNode);
            }}
          >
            <FiPlus />
          </PopoverTrigger>
          <PopoverContent align="end" className="text-xs flex flex-col gap-2">
            <div>{popoverData?.data?.triggerEvent}</div>
            <div className="flex flex-col gap-2">
              {popoverData?.data?.selectedResponse?.data &&
                Object.entries(popoverData?.data?.selectedResponse?.data)?.map(
                  ([key, value]) => (
                    <div key={key}>
                      <Button
                        onClick={() => {
                          setData({
                            ...data,
                            messageText: `${data?.messageText} ${JSON.stringify(
                              { [key]: value }
                            )}`,
                          });
                        }}
                        variant="outline"
                        className="flex items-center gap-2 p-0 px-1 m-0 h-auto"
                      >
                        <span>{key}</span>
                        <span className="text-xs text-gray-500">
                          {String(value)}
                        </span>
                      </Button>
                    </div>
                  )
                )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Configure;
