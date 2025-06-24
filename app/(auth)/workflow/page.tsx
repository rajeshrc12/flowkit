"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

const WorkflowPage = () => {
  const router = useRouter();
  const createWorkflow = async () => {
    const response = await axios.post("/api/workflow");
    console.log(response.data);
    router.push(`/workflow/${response.data.workflow.id}`);
  };
  return (
    <div className="pt-10 px-2">
      <div className="flex justify-between">
        <div className="font-bold text-2xl">Dashboard</div>
        <Button onClick={createWorkflow}>Create Workflow</Button>
      </div>
      <div>
        <div>Workflow List</div>
      </div>
    </div>
  );
};

export default WorkflowPage;
