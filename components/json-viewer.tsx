import React from "react";

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

const JsonViewer = ({
  data,
  level = 0,
}: {
  data: JsonValue;
  level?: number;
}) => {
  if (typeof data !== "object" || data === null) {
    return (
      <div className="text-xs">
        <span>{JSON.stringify(data)}</span>
      </div>
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-1 ml-1">
        {data.map((item, index) => (
          <div key={index} className="flex">
            <div className="text-gray-400 pr-1">[{index}]</div>
            <JsonViewer data={item} level={level + 1} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {Object.entries(data).map(([key, value], index) => (
        <div key={index} className="flex gap-2 items-start">
          <div className="border bg-gray-100 text-xs px-2 py-0.5 rounded">
            {key}:
          </div>
          <div className="flex-1">
            <JsonViewer data={value} level={level + 1} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default JsonViewer;
