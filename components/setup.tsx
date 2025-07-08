import React, { useEffect } from "react";
import { SiGooglesheets, SiSlack } from "react-icons/si";
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

const Setup = ({ data, setData }: { data: any; setData: any }) => {
  const editNode = useSelector((state: RootState) => state.node.editNode);

  if (editNode.type === "google_sheets")
    return (
      <div className="flex flex-col text-sm gap-2">
        <div className="flex flex-col gap-2">
          <div>App</div>
          <div className="flex justify-between items-center border p-2 rounded">
            <div className="flex items-center gap-2 border p-1 rounded">
              <SiGooglesheets color="green" />
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
              {data?.credentials?.length > 0 ? (
                data?.credentials?.map((credential: any) => (
                  <SelectItem key={credential.id} value={credential.id}>
                    {credential.name}
                    <span className="ml-2 text-xs text-gray-500">
                      {credential.email}
                    </span>
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="no-credentials">
                  No credentials found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  if (editNode.type === "slack")
    return (
      <div className="flex flex-col text-sm gap-2">
        <div className="flex flex-col gap-2">
          <div>App</div>
          <div className="flex justify-between items-center border p-2 rounded">
            <div className="flex items-center gap-2 border p-1 rounded">
              <SiSlack />
              <div>Slack</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>Action Event</div>
          <Select
            value={data?.actionEvent || ""}
            onValueChange={(value) =>
              setData({
                ...data,
                actionEvent: value,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Send channel message">
                  Send channel message
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
              <SelectGroup>
                <SelectItem value="abc@gmail.com">abc@gmail.com</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
};

export default Setup;
