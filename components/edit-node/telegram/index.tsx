import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { resetEditNode } from "@/app/slices/nodeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { cn } from "@/lib/utils";
import { NodeData } from "@/types/node";
import { MdKeyboardArrowRight } from "react-icons/md";
import { updateNode } from "@/app/slices/nodeSlice";
import Setup from "@/components/edit-node/telegram/setup";
import Configure from "@/components/edit-node/telegram/configure";
import Test from "@/components/edit-node/telegram/test";

const TelegramIndex = () => {
  const dispatch = useDispatch();
  const node = useSelector((state: RootState) => state.node);
  const [data, setData] = useState<NodeData>();
  const [activeTab, setActiveTab] = useState("Setup");

  useEffect(() => {
    if (node.editNode.id) {
      const nodeData = node.nodes.find((n) => n.id === node?.editNode?.id);
      setData({
        ...nodeData?.data,
        id: node.editNode.id,
        type: node.editNode.type,
      });
    }
  }, [node.editNode]);
  const handleContinue = () => {
    dispatch(updateNode({ id: node.editNode.id, data }));
    if (activeTab === "Setup") {
      setActiveTab("Configure");
    }
    if (activeTab === "Configure") {
      setActiveTab("Test");
    }
    if (activeTab === "Test") {
      console.log(data);
    }
  };
  return (
    <div className="flex flex-col absolute top-3 right-3 w-[400px] h-[400px] border shadow rounded bg-background">
      <div className="flex justify-between border-b p-2">
        <div className="font-bold">{data?.triggerEvent || "Select event"}</div>
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
      <div className="px-2 relative flex-1 overflow-y-auto">
        {activeTab === "Setup" && <Setup data={data} setData={setData} />}
        {activeTab === "Configure" && (
          <Configure data={data} setData={setData} />
        )}
        {activeTab === "Test" && <Test data={data} setData={setData} />}
      </div>
      <div className="p-2">
        <Button className="w-full" onClick={handleContinue}>
          {activeTab === "Test" ? "Submit" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default TelegramIndex;
