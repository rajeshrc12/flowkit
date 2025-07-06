import React, { useState } from "react";
import AddNode from "@/components/add-node";
import { Node } from "@/types/node";
import BaseNode from "@/components/base-node";

const GraphBoard = () => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "google_sheets",
      type: "google_sheets",
      label: "Google Sheets",
    },
  ]);
  return (
    <div>
      <div>
        {nodes.map((node, index) => (
          <BaseNode type={node.type} index={index + 1} key={node.id} />
        ))}
      </div>
      <div>
        <AddNode
          handleAddNode={(node: Node) => {
            setNodes((prevNodes) => [
              ...prevNodes,
              { ...node, id: new Date().getTime().toString() },
            ]);
          }}
        />
      </div>
    </div>
  );
};

export default GraphBoard;
