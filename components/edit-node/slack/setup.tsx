import React from "react";
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

const Setup = ({ data, setData }: { data: any; setData: any }) => {
  return (
    <div className="flex flex-col text-sm gap-2">
      <div className="flex flex-col gap-2">
        <div>App</div>
        <div className="flex justify-between items-center border p-2 rounded">
          <div className="flex items-center gap-2 border p-1 rounded">
            <NodeIcon name="slack" size={20} />
            <div>Slack</div>
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
              <SelectItem value="Send a message">Send a message</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <div>Account</div>
        <Select
          value={data?.account || "loading"}
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
            <SelectItem disabled value="loading">
              No credentials found
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Setup;
