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

const EditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="h-[50px] w-full flex justify-between items-center px-4 border-b">
        <div className="flex gap-2 items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <FiHome color="" className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </div>
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
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="h-full w-[50px] border-r p-2 flex flex-col items-center"></div>
        <div className="flex flex-col h-full w-full">
          <div className="relative h-full w-full flex">
            {children}
            <EditNodeIndex />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;
