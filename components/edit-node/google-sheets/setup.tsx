import React from "react";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import { SiGooglesheets } from "react-icons/si";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NodeIcon from "@/components/node-icon";
import { Skeleton } from "@/components/ui/skeleton";

const Setup = ({ data, setData }: { data: any; setData: any }) => {
  const { data: credentials, isLoading } = useSWR(
    data?.type ? `/api/credential/${data.type}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0, // No polling
    }
  );
  return (
    <div className="flex flex-col text-sm gap-2">
      <div className="flex flex-col gap-2">
        <div>App</div>
        <div className="flex justify-between items-center border p-2 rounded">
          <div className="flex items-center gap-2 border p-1 rounded">
            <NodeIcon name="google_sheets" size={20} />
            <div>Google sheet</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div>Trigger Event</div>
        <Select
          value={data?.triggerEvent || ""}
          onValueChange={(value) =>
            setData({
              ...data,
              triggerEvent: value,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select event" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="New or updated spreadsheet row">
                New or updated spreadsheet row
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <div>Account</div>
        <Select
          value={data?.account || ""}
          onValueChange={(value) =>
            setData({
              ...data,
              account: value,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            {!isLoading && credentials?.length > 0 ? (
              credentials?.map((credential: any) => (
                <SelectItem key={credential.id} value={credential.id}>
                  {credential.name}
                  <span className="ml-2 text-xs text-gray-500">
                    {credential.email}
                  </span>
                </SelectItem>
              ))
            ) : (
              <SelectItem disabled value="loading">
                No credentials found
              </SelectItem>
            )}
            {isLoading && (
              <SelectItem value="__loading_credential" disabled>
                <Skeleton className="h-4 w-32" />
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Setup;
