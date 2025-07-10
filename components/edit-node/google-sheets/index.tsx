import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { resetEditNode, updateNode } from "@/app/slices/nodeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Button } from "@/components/ui/button";
import Setup from "@/components/edit-node/google-sheets/setup";
import Configure from "@/components/edit-node/google-sheets/configure";
import Test from "@/components/edit-node/google-sheets/test";
import { NodeData } from "@/types/node";

const GoogleSheetsIndex = () => {
  const dispatch = useDispatch();
  const node = useSelector((state: RootState) => state.node);
  const [activeTab, setActiveTab] = React.useState("setup");
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
    if (activeTab === "setup") {
      setActiveTab("configure");
    }
    if (activeTab === "configure") {
      setActiveTab("test");
    }
    if (activeTab === "test") {
    }
  };
  return (
    <div className="flex flex-col absolute top-3 right-3 w-[400px] h-[400px] bg-white shadow border-2 border-blue-800 rounded">
      <div className="flex justify-between bg-blue-50 p-2">
        <div>{data?.triggerEvent || "Select event"}</div>
        <IoMdClose color="black" onClick={() => dispatch(resetEditNode())} />
      </div>
      <div className="flex gap-2 text-sm border-b font-medium">
        {["setup", "configure"].map((tab) => (
          <div key={tab} className="flex items-center gap-2">
            <button
              className={cn("hover:text-blue-800 cursor-pointer p-2", {
                "text-blue-800 border-b border-blue-800": activeTab === tab,
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
            className={cn("hover:text-blue-800 cursor-pointer p-2", {
              "text-blue-800 border-b border-blue-800": activeTab === "test",
            })}
            onClick={() => {
              dispatch(updateNode({ id: node.editNode.id, data }));
              setActiveTab("test");
            }}
          >
            Test
          </button>
        </div>
      </div>
      <div className="p-2 flex-1 overflow-y-auto">
        {activeTab === "setup" && <Setup data={data} setData={setData} />}
        {activeTab === "configure" && (
          <Configure data={data} setData={setData} />
        )}
        {activeTab === "test" && <Test />}
      </div>
      <div className="p-2">
        <Button className="w-full bg-blue-800" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default GoogleSheetsIndex;
