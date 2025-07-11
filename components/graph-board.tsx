import React from "react";
import AddNode from "@/components/add-node";
import BaseNode from "@/components/base-node";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Node } from "@/types/node";

const GraphBoard = () => {
  const nodes = useSelector((state: RootState) => state.node.nodes);
  // console.log(nodes);
  return (
    <div>
      <div>
        {nodes.length == 0 && (
          <BaseNode type={"trigger"} index={1} key={"trigger"} id={"trigger"} />
        )}
        {nodes.map((node: Node, index: number) => (
          <BaseNode
            data={node.data}
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
