import React, { useEffect } from "react";
import AddNode from "@/components/add-node";
import BaseNode from "@/components/base-node";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Node } from "@/types/node";
import { initNodes } from "@/app/slices/nodeSlice";

const GraphBoard = () => {
  const nodes = useSelector((state: RootState) => state.node.nodes);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(initNodes([{ id: "loading", type: "loading", data: {} }]));
    };
  }, []);
  return (
    <div>
      <div>
        {nodes.map((node: Node, index: number) => (
          <BaseNode
            data={node.data}
            type={node.type}
            index={index + 1}
            key={node.id}
            id={node.id}
          />
        ))}
        {nodes.length == 0 && (
          <BaseNode type={"trigger"} index={1} key={"trigger"} id={"trigger"} />
        )}
      </div>
      <div>
        <AddNode />
      </div>
    </div>
  );
};

export default GraphBoard;
