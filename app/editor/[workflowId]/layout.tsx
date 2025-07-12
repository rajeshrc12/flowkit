"use client";
import React from "react";
import { FiHome, FiPlay } from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import EditNodeIndex from "@/components/edit-node";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const nodes = useSelector((state: RootState) => state.node.nodes);
  const { workflowId } = useParams();

  const handleSave = async () => {
    const workflow = await axios.patch(`/api/workflow`, { nodes, workflowId });

    if (workflow.data) {
      toast.success("Workflow saved successfully");
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-[50px] w-full flex justify-between items-center px-4 border-b">
        <div></div>
        <input
          type="text"
          placeholder="New workflow"
          className="font-medium text-sm border-none outline-none"
        />
        <div className="flex gap-2 justify-center items-center">
          <Button variant="outline" className="p-1 m-0 h-auto rounded">
            <FiPlay />
            <span>Test Run</span>
          </Button>
          <Button variant="outline" className="px-2 py-1 m-0 h-auto rounded">
            <span>Publish</span>
          </Button>
          <Button
            onClick={handleSave}
            variant="default"
            className="px-2 py-1 m-0 h-auto rounded"
          >
            <span>Save</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="h-full w-[50px] border-r p-2 flex flex-col items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <FiHome
                onClick={() => router.push("/workflow")}
                className="cursor-pointer"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="relative h-full w-full flex bg-[#f9f7f3]">
            {children}
            <EditNodeIndex />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
