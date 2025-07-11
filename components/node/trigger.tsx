import { cn } from "@/lib/utils";
import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import withBottomConnector from "../hoc/withBottomConnector";
import { useDispatch } from "react-redux";
import { setAddNodeModal } from "@/app/slices/nodeSlice";

const Trigger = ({ index }: { index: number } & any) => {
  const dispatch = useDispatch();
  return (
    <div
      className={cn(
        "w-[350px] bg-background rounded-md p-3 flex flex-col gap-2 cursor-pointer border-2 border-primary border-dashed"
      )}
      onClick={() => {
        dispatch(setAddNodeModal(true));
      }}
    >
      <div className="flex justify-between">
        <div className="text-sm border rounded px-2 flex items-center gap-2 bg-[#ece9df]">
          <AiOutlineThunderbolt />
          Trigger
        </div>
        <div></div>
      </div>
      <div>
        <span className="text-muted-foreground">
          Add Node to start your workflow
        </span>
      </div>
    </div>
  );
};

export default withBottomConnector(Trigger);
