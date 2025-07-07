import React from "react";
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

const Setup = () => {
  const editNode = useSelector((state: RootState) => state.node.editNode);
  console.log(editNode);
  if (editNode.type === "google-sheets")
    return (
      <div className="flex flex-col text-sm gap-2">
        <div className="flex flex-col gap-2">
          <div>App</div>
          <div className="flex justify-between items-center border p-2 rounded">
            <div className="flex items-center gap-2 border p-1 rounded">
              <SiGooglesheets color="green" />
              <div>Google sheet</div>
            </div>
            <button className="px-2 py-0 h-auto rounded bg-blue-800 text-white">
              Change
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>Trigger Event</div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">
                  New or updated spreadsheet row
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <div>Account</div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">abc@gmail.com</SelectItem>
              </SelectGroup>
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
            <button className="px-2 py-0 h-auto rounded bg-blue-800 text-white">
              Change
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div>Action Event</div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select event" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Send channel message</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <div>Account</div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">abc@gmail.com</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
};

export default Setup;
