"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import { Workflow } from "@prisma/client";
import { AiFillEdit } from "react-icons/ai";

const WorkflowPage = () => {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR(`/api/workflow`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });
  console.clear();
  console.log(JSON.stringify(data));
  const createWorkflow = async () => {
    const response = await axios.post("/api/workflow");
    console.log(response.data);
    router.push(`/workflow/${response.data.workflow.id}`);
  };

  if (!data || isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error while loading workflows...</p>;
  }

  return (
    <div className="pt-10 px-2">
      <div className="flex justify-between">
        <div className="font-bold text-2xl"></div>
        <Button onClick={createWorkflow}>Create Workflow</Button>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {data?.workflows?.map((workflow: Workflow) => (
          <div
            className="border p-2 flex justify-between rounded-md"
            key={workflow.id}
          >
            <div>{workflow.name}</div>
            <Button
              onClick={() => router.push(`/workflow/${workflow.id}`)}
              variant="outline"
            >
              <AiFillEdit />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowPage;
