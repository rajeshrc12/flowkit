import React from "react";
import AddNode from "@/components/add-node";
import BaseNode from "@/components/base-node";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const GraphBoard = () => {
  const nodes = useSelector((state: RootState) => state.node.nodes);
  console.log(nodes);
  return (
    <div>
      <div>
        {nodes.map((node, index) => (
          <BaseNode
            type={node.type}
            index={index + 1}
            key={node.id}
            id={node.id}
          />
        ))}
      </div>
      <div>
        <AddNode />
      </div>
    </div>
  );
};

export default GraphBoard;
