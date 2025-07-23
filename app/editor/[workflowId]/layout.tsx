"use client";
import React, { useEffect, useState } from "react";
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
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import { cn } from "@/lib/utils";

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const nodes = useSelector((state: RootState) => state.node.nodes);

  const { workflowId } = useParams();
  const { data, isLoading, mutate } = useSWR(
    workflowId ? `/api/workflow/${workflowId}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0, // No polling
    }
  );
  const [name, setName] = useState("");

  const handleSave = async () => {
    const workflow = await axios.patch(`/api/workflow`, {
      nodes,
      workflowId,
      name,
    });
    mutate();
    if (workflow.data) {
      toast.success("Workflow saved successfully");
    }
  };

  const handleTestRun = async () => {
    const workflow = await axios.post(`/api/workflow/run`, { workflowId });
    console.log(workflow);
    if (workflow.data) {
      toast.success("Workflow executed successfully");
    }
  };

  const handlePublish = async () => {
    const workflow = await axios.post(`/api/workflow/publish`, {
      workflowId,
      isPublished: !data?.isPublished,
    });
    console.log(workflow);
    mutate();
    if (workflow.data) {
      toast.success(
        "Workflow " +
          (!data?.isPublished ? "published" : "unpublished") +
          " successfully"
      );
    }
  };
  console.log(data);
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-[50px] w-full flex justify-between items-center px-4 border-b">
        <div></div>
        <input
          value={name || data?.name || ""}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="New workflow"
          className="font-medium text-sm border-none outline-none"
        />
        <div className="flex gap-2 justify-center items-center">
          <Button
            onClick={handleTestRun}
            variant="outline"
            className="p-1 m-0 h-auto rounded"
          >
            <FiPlay />
            <span>Test Run</span>
          </Button>
          <Button
            onClick={handlePublish}
            variant="outline"
            className={cn("px-2 py-1 m-0 h-auto rounded", {
              "bg-red-500 text-white hover:bg-red-600 hover:text-white":
                data?.isPublished,
            })}
          >
            <span>{data?.isPublished ? "Unpublish" : "Publish"}</span>
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
            {!isLoading && children}
            <EditNodeIndex />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
