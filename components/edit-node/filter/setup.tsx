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
            <NodeIcon name="filter" size={20} />
            <div>Filter</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
