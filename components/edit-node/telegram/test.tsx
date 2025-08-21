import JsonViewer from "@/components/json-viewer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const Test = ({ data, setData }: { data: any; setData: any }) => {
  console.log(data);
  return (
    <div className="w-full">
      <div>Data in</div>
      <div className="flex flex-col gap-2 w-full">
        {data?.response.length > 0 ? (
          data?.response?.map((row: any, index: number) => (
            <Popover key={index}>
              <PopoverTrigger
                onClick={() => {
                  const newData = {
                    ...data,
                    selectedResponse: {
                      index,
                      data: row,
                    },
                  };
                  setData(newData);
                }}
                className={cn(
                  "border hover:border-primary p-2 rounded flex justify-between w-full",
                  {
                    "bg-gray-100 border-primary":
                      data?.selectedResponse?.index === index,
                  }
                )}
              >
                <div>Message {index + 1}</div>
                <MdKeyboardArrowRight />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="!max-w-[400px] w-[400px] overflow-y-auto"
              >
                <JsonViewer data={row} />
              </PopoverContent>
            </Popover>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
      {/* <JsonViewer  /> */}
    </div>
  );
};

export default Test;
