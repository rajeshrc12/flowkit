import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { nodes } from "@/data/nodes";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useDispatch } from "react-redux";
import { setAddNodeModal } from "@/app/slices/nodeSlice";
import { Node } from "@/types/node";
import { addNode } from "@/app/slices/nodeSlice";
import { Input } from "@/components/ui/input";
import NodeIcon from "./node-icon";
import { FiHome } from "react-icons/fi";
import { TbApps } from "react-icons/tb";
import { AiFillControl } from "react-icons/ai";

const AddNode = () => {
  const addNodeModal = useSelector(
    (state: RootState) => state.node.addNodeModal
  );
  const dispatch = useDispatch();
  const setOpen = (open: boolean) => {
    dispatch(setAddNodeModal(open));
  };
  const [activeTab, setActiveTab] = React.useState("home");
  useEffect(() => {
    if (!addNodeModal) {
      setActiveTab("home");
    }
  }, [addNodeModal]);

  if (!addNodeModal) return;
  return (
    <Dialog open={!!addNodeModal} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="h-screen !max-w-[650px] p-0 rounded-l"
      >
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <div className="flex h-full">
            <div className="bg-gray-100 w-[200px] border-r h-full flex flex-col px-2 py-4">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                onClick={() => setActiveTab("home")}
                className="flex justify-start items-center gap-2 px-2"
              >
                <span>
                  <FiHome size={15} />
                </span>
                <span>Home</span>
              </Button>
              <Button
                variant={activeTab === "app" ? "default" : "ghost"}
                onClick={() => setActiveTab("app")}
                className="flex justify-start items-center gap-2 px-2"
              >
                <span>
                  <TbApps size={15} />
                </span>
                <span>Apps</span>
              </Button>
              <Button
                variant={activeTab === "control" ? "default" : "ghost"}
                onClick={() => setActiveTab("control")}
                className="flex justify-start items-center gap-2 px-2"
              >
                <span>
                  <AiFillControl size={15} />
                </span>
                <span>Flow Controls</span>
              </Button>
            </div>
            <div className="flex flex-col gap-2 h-full w-full p-2">
              <div className="w-full">
                <Input placeholder="Search app" className="w-full" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 flex flex-col gap-2">
                  {activeTab === "home" && (
                    <div className="text-sm font-medium text-muted-foreground">
                      Top Apps
                    </div>
                  )}
                  <div>
                    {nodes
                      .filter(
                        (node: Node) =>
                          activeTab === "home" || node.name === activeTab
                      )
                      .map((node: Node) => (
                        <Button
                          variant="ghost"
                          key={node.id}
                          onClick={() => {
                            dispatch(
                              addNode({
                                ...node,
                                id: new Date().getTime().toString(),
                              })
                            );
                            setOpen(false);
                          }}
                          className="flex justify-start items-center gap-2 px-1"
                        >
                          <span>
                            <NodeIcon name={node.type} size={15} />
                          </span>
                          <span>{node.label}</span>
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNode;
