import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useSWR from "swr";
import { fetcher } from "@/utils/api";

const Configure = ({ data, setData }: { data: any; setData: any }) => {
  const editNode = useSelector((state: RootState) => state.node.editNode);
  const { data: sheets } = useSWR(
    data.account ? `/api/google/sheets/${data.account}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0, // No polling
    }
  );
  console.clear();
  console.log(sheets, data);
  if (!sheets) return;
  if (editNode.type === "google_sheets")
    return (
      <div className="flex flex-col text-sm gap-2">
        <div className="flex flex-col gap-2">
          <div>Spreadsheet</div>
          <Select
            value={data?.spreadsheet || ""}
            onValueChange={(value) =>
              setData({
                ...data,
                spreadsheet: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select spreadsheet" />
            </SelectTrigger>
            <SelectContent>
              {sheets.map((sheet: any) => (
                <SelectItem key={sheet.id} value={sheet.id}>
                  {sheet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <div>Worksheets</div>
          <Select
            value={data?.worksheet || ""}
            onValueChange={(value) =>
              setData({
                ...data,
                worksheet: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select worksheet" />
            </SelectTrigger>
            <SelectContent>
              {sheets
                ?.find((sheet: any) => sheet.id === data.spreadsheet)
                ?.sheets?.map((sheet: any) => (
                  <SelectItem key={sheet} value={sheet}>
                    {sheet}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  if (editNode.type === "slack")
    return (
      <div className="flex flex-col text-sm gap-2">
        <div className="flex flex-col gap-2">
          <div>Channel</div>
          <Select
            value={data?.channel || ""}
            onValueChange={(value) =>
              setData({
                ...data,
                channel: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="channel_1">Channel 1</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <div>Bot name</div>
          <Input
            value={data?.botName || ""}
            onChange={(e) =>
              setData({
                ...data,
                botName: e.target.value,
              })
            }
            placeholder="Enter bot name"
          />
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
            rows={4}
            placeholder="Enter message text"
          />
        </div>
      </div>
    );
};

export default Configure;
