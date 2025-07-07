import React from "react";
import { SiSlack } from "react-icons/si";
import withBottomConnector from "@/components/hoc/withBottomConnector";
import { useDispatch } from "react-redux";
import { setEditNode } from "@/app/slices/nodeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { cn } from "@/lib/utils";
const Slack = ({ index, id }: { index: number; id: string } & any) => {
  const dispatch = useDispatch();
  const editNode = useSelector((state: RootState) => state.node.editNode);
  return (
    <div
      onClick={() => {
        dispatch(setEditNode({ type: "slack", id }));
      }}
      className={cn(
        "w-[300px] shadow-md bg-white rounded-md p-3 flex flex-col gap-2 cursor-pointer",
        {
          "bg-blue-50 border border-blue-800": editNode.type === "slack",
        }
      )}
    >
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
