import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border p-2 rounded flex justify-between items-center"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-4" />
        </div>
      ))}
    </div>
  );
};

const Test = ({ data, setData }: { data: any; setData: any }) => {
  if (!data?.worksheetData) {
    return <SkeletonLoader />;
  }
  return (
    <div className="text-sm flex flex-col gap-2">
      {data?.worksheetData.length > 0 ? (
        data?.worksheetData?.map((row: any, index: number) => (
          <Popover key={index}>
            <PopoverTrigger
              onClick={() => {
                setData({
                  ...data,
                  worksheetIndex: index,
                });
              }}
              className={cn(
                "border hover:border-primary p-2 rounded flex justify-between",
                {
                  "bg-gray-100 border-primary": data?.worksheetIndex === index,
                }
              )}
            >
              <div>Spreadsheet Row {index + 1}</div>
              <MdKeyboardArrowRight />
            </PopoverTrigger>
            <PopoverContent align="start">
              <div className="flex flex-col gap-2">
                {row?.map((cell: any, cellIndex: number) =>
                  Object.entries(cell)?.map(([key, value]) => (
                    <div key={key + index} className="flex items-center gap-2">
                      <span className="font-medium border px-1">{key}</span>
                      <span className="text-sm">{value as string}</span>
                    </div>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
        ))
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default Test;
