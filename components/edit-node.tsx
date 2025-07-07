import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import Setup from "@/components/setup";
import Configure from "@/components/configure";
import Test from "@/components/test";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { resetEditNode, setEditNode } from "@/app/slices/nodeSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { Button } from "@/components/ui/button";
const EditNode = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState("setup");
  const node = useSelector((state: RootState) => state.node);
  if (!node.editNode.type) return;
  return (
    <div className="flex flex-col absolute top-3 right-3 w-[400px] h-[400px] bg-white shadow border-2 border-blue-800 rounded">
      <div className="flex justify-between bg-blue-50 p-2">
        <div>Edit Node</div>
        <IoMdClose color="black" onClick={() => dispatch(resetEditNode())} />
      </div>
      <div className="flex gap-2 text-sm border-b font-medium">
        {["setup", "configure"].map((tab) => (
          <div key={tab} className="flex items-center gap-2">
            <button
              className={cn("hover:text-blue-800 cursor-pointer p-2", {
                "text-blue-800 border-b border-blue-800": activeTab === tab,
              })}
              onClick={() => setActiveTab(tab)}
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
            onClick={() => setActiveTab("test")}
          >
            Test
          </button>
        </div>
      </div>
      <div className="p-2 flex-1 overflow-y-auto">
        {activeTab === "setup" && <Setup />}
        {activeTab === "configure" && <Configure />}
        {activeTab === "test" && <Test />}
      </div>
      <div className="p-2">
        <Button className="w-full bg-blue-800">Continue</Button>
      </div>
    </div>
  );
};

export default EditNode;
