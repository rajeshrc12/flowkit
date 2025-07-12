import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { resetEditNode, updateNode } from "@/app/slices/nodeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import Setup from "@/components/edit-node/slack/setup";
import { NodeData } from "@/types/node";
import Configure from "@/components/edit-node/slack/configure";

const SlackIndex = () => {
  const dispatch = useDispatch();
  const node = useSelector((state: RootState) => state.node);
  const [activeTab, setActiveTab] = React.useState("Setup");
  const [data, setData] = React.useState<NodeData>();
  useEffect(() => {
    if (node.editNode.id) {
      const nodeData = node.nodes.find((n) => n.id === node?.editNode?.id);
      setData({
        ...nodeData?.data,
        id: node.editNode.id,
        type: node.editNode.type,
      });
    }
  }, [node.editNode.id]);

  const handleContinue = () => {
    dispatch(updateNode({ id: node.editNode.id, data }));
    if (activeTab === "Setup") {
      setActiveTab("Configure");
    }
    if (activeTab === "Configure") {
      setActiveTab("Test");
    }
    if (activeTab === "Test") {
    }
  };
  return (
    <div className="flex flex-col absolute top-3 right-3 w-[400px] h-[400px] border shadow rounded bg-background">
      <div className="flex justify-between border-b p-2">
        <div className="font-bold">{data?.actionEvent || "Select event"}</div>
        <IoMdClose color="black" onClick={() => dispatch(resetEditNode())} />
      </div>
      <div className="flex gap-2 text-sm border-b font-medium">
        {["Setup", "Configure"].map((tab) => (
          <div key={tab} className="flex items-center gap-2">
            <button
              className={cn("hover:font-medium cursor-pointer p-2", {
                "font-medium border-b border-primary": activeTab === tab,
              })}
              onClick={() => {
                dispatch(updateNode({ id: node.editNode.id, data }));
                setActiveTab(tab);
              }}
            >
              {tab}
            </button>
            <MdKeyboardArrowRight />
          </div>
        ))}
        <div className="flex items-center gap-2">
          <button
            className={cn("hover:font-medium cursor-pointer p-2", {
              "font-medium border-b border-primary": activeTab === "Test",
            })}
            onClick={() => {
              dispatch(updateNode({ id: node.editNode.id, data }));
              setActiveTab("Test");
            }}
          >
            Test
          </button>
        </div>
      </div>
      <div className="p-2 flex-1 overflow-y-auto">
        {activeTab === "Setup" && <Setup data={data} setData={setData} />}
        {activeTab === "Configure" && (
          <Configure data={data} setData={setData} />
        )}
      </div>
      <div className="p-2">
        <Button className="w-full" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SlackIndex;
