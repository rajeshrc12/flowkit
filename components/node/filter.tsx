import React from "react";
import { SiSlack } from "react-icons/si";
import withBottomConnector from "@/components/hoc/withBottomConnector";
import { useDispatch } from "react-redux";
import { setEditNode } from "@/app/slices/nodeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { cn } from "@/lib/utils";
import { NodeData } from "@/types/node";
import { FiFilter } from "react-icons/fi";
const Filter = ({
  index,
  id,
  data,
}: { index: number; id: string; data?: NodeData } & any) => {
  const dispatch = useDispatch();
  const editNode = useSelector((state: RootState) => state.node.editNode);
  return (
    <div
      onClick={() => {
        dispatch(setEditNode({ type: "filter", id }));
      }}
      className={cn(
        "w-[350px] shadow-md border bg-white rounded-md p-3 flex flex-col gap-2 cursor-pointer",
        {
          "shadow-lg/20 border-primary": editNode.id === id,
        }
      )}
    >
      <div className="flex justify-between">
        <div className="font-medium border rounded px-2 flex items-center gap-2">
          <FiFilter color="orange" />
          Filter
        </div>
        <div></div>
      </div>
      <div>
        {index}. {"Filter Condition"}
      </div>
    </div>
  );
};

export default withBottomConnector(Filter);
