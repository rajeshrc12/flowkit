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
import Test from "@/components/edit-node/slack/test";
import axios from "axios";
import { FiLoader } from "react-icons/fi";
import { createPlainMessages } from "@/utils/formatMessage";

const SlackIndex = () => {
  const dispatch = useDispatch();
  const node = useSelector((state: RootState) => state.node);
  const [activeTab, setActiveTab] = React.useState("Setup");
  const [data, setData] = React.useState<NodeData>();
  const [isLoading, setIsLoading] = React.useState(false);
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

  const handleContinue = async () => {
    dispatch(updateNode({ id: node.editNode.id, data }));
    if (activeTab === "Setup") {
      setActiveTab("Configure");
    }
    if (activeTab === "Configure") {
      setActiveTab("Test");
      const nodeIndex = node.nodes.findIndex(
        (n: any) => n.id === node.editNode.id
      );
      const prevNode = node.nodes[nodeIndex - 1] as any;
      const prevNodeData = prevNode?.data?.selectedResponse?.data;
      setData({
        ...data,
        messageTextPlain: createPlainMessages(data?.messageText || "", [
          prevNodeData,
        ]).join("\n"),
      });
    }
    if (activeTab === "Test") {
      setIsLoading(true);
      const message = await axios.post(`/api/slack/message`, data);
      setData({ ...data, response: message.data });
      setIsLoading(false);
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
        {activeTab === "Test" && <Test data={data} setData={setData} />}
      </div>
      <div className="p-2">
        <Button
          className="w-full"
          onClick={handleContinue}
          disabled={isLoading}
        >
          {isLoading && <FiLoader className="mr-2 h-4 w-4 animate-spin" />}
          {activeTab === "Test" ? "Test this step" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default SlackIndex;
