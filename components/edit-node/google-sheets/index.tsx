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
import axios from "axios";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from "sonner";

const GoogleSheetsIndex = () => {
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
  }, [node.editNode]);

  const fetchSpreadsheetData = async () => {
    if (data?.spreadsheet && data?.worksheet && data?.account) {
      const url = `/api/google/worksheet?spreadsheetId=${data?.spreadsheet}&worksheetName=${data?.worksheet}&credentialId=${data?.account}`;
      const sheet = await axios.get(url);
      console.log(sheet.data);
      setData({
        ...data,
        response: sheet.data,
      });
    }
  };
  const handleContinue = () => {
    dispatch(updateNode({ id: node.editNode.id, data }));
    if (activeTab === "Setup") {
      setActiveTab("Configure");
    }
    if (activeTab === "Configure") {
      fetchSpreadsheetData();
      setActiveTab("Test");
    }
    if (activeTab === "Test") {
      console.log(data);
    }
  };
  console.clear();
  console.log("google sheets data", data);
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
        {activeTab === "Test" && (
          <div className="sticky top-0 py-3 flex gap-2 bg-white">
            <div className="text-sm">Available records</div>
            <FiRefreshCcw
              className="cursor-pointer"
              onClick={async () => {
                await fetchSpreadsheetData();
                toast.success("Data fetched successfully");
              }}
            />
          </div>
        )}
        {activeTab === "Setup" && <Setup data={data} setData={setData} />}
        {activeTab === "Configure" && (
          <Configure data={data} setData={setData} />
        )}
        {activeTab === "Test" && <Test data={data} setData={setData} />}
      </div>
      <div className="p-2">
        <Button className="w-full" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default GoogleSheetsIndex;
