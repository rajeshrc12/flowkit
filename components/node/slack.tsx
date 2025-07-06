import React from "react";
import { SiSlack } from "react-icons/si";
import withBottomConnector from "@/components/hoc/withBottomConnector";
const Slack = ({ index }: { index: number } & any) => {
  return (
    <div className="w-[300px] shadow-md bg-white rounded-md p-3 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="font-medium border rounded px-2 flex items-center gap-2">
          <SiSlack />
          Slack
        </div>
        <div></div>
      </div>
      <div>{index}. New or updated spreadsheet row</div>
    </div>
  );
};

export default withBottomConnector(Slack);
