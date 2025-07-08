import React from "react";
import { SiGooglesheets } from "react-icons/si";
import withBottomConnector from "@/components/hoc/withBottomConnector";
import { useDispatch } from "react-redux";
import { setEditNode } from "@/app/slices/nodeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { cn } from "@/lib/utils";
import { NodeData } from "@/types/node";
const GoogleSheets = ({
  index,
  id,
  data,
}: { index: number; id: string; data?: NodeData } & any) => {
  const dispatch = useDispatch();
  const editNode = useSelector((state: RootState) => state.node.editNode);
  return (
    <div
      className={cn(
        "w-[300px] shadow-md bg-white rounded-md p-3 flex flex-col gap-2 cursor-pointer",
        {
          "bg-blue-50 border border-blue-800": editNode.id === id,
        }
      )}
      onClick={() => {
        dispatch(setEditNode({ type: "google_sheets", id }));
      }}
    >
      <div className="flex justify-between">
        <div className="font-medium border rounded px-2 flex items-center gap-2">
          <SiGooglesheets color="green" />
          Google Sheets
        </div>
        <div></div>
      </div>
      <div>
        {index}. {data?.triggerEvent || "Select event"}
      </div>
    </div>
  );
};

export default withBottomConnector(GoogleSheets);
