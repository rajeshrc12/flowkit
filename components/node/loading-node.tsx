import React from "react";
import withBottomConnector from "@/components/hoc/withBottomConnector";
import { Skeleton } from "../ui/skeleton";

const LoadingNode = () => {
  return (
    <div className="w-[350px] shadow-md bg-background rounded-md p-3 flex flex-col gap-2 cursor-pointer border">
      <div className="flex justify-between">
        <div className="rounded px-2 flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div></div>
      </div>
      <div>
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

export default withBottomConnector(LoadingNode);
