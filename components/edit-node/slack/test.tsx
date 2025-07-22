import React, { useEffect } from "react";
import JsonViewer from "@/components/json-viewer";

const Test = ({ data, setData }: { data: any; setData: any }) => {
  useEffect(() => {
    return () => {
      setData({ ...data, response: null });
    };
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <div>Data In</div>
      <div className="flex gap-2 items-center text-xs">
        <div className="border bg-accent p-1 rounded">Message:</div>
        <div>{data?.messageTextPlain}</div>
      </div>

      {data.response && (
        <>
          <div>Data Out</div>
          <div className="">
            <JsonViewer data={data.response} />
          </div>
        </>
      )}
    </div>
  );
};

export default Test;
