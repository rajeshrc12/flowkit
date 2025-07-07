import React from "react";
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

const Configure = () => {
  const editNode = useSelector((state: RootState) => state.node.editNode);
  console.log(editNode);
  if (editNode.type === "google-sheets")
    return (
      <div className="flex flex-col text-sm gap-2">
        <div className="flex flex-col gap-2">
          <div>Spreadsheet</div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select spreadsheet" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Sheet 1</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <div>Worksheets</div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select worksheet" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Sheet 1</SelectItem>
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
          <div>Channel</div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Channel 1</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <div>Bot name</div>
          <Input placeholder="Enter bot name" />
        </div>
        <div className="flex flex-col gap-2">
          <div>Message text</div>
          <Textarea rows={4} placeholder="Enter message text" />
        </div>
      </div>
    );
};

export default Configure;
