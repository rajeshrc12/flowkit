"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { CiMenuKebab } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Node } from "@/types/node";
import NodeIcon from "@/components/node-icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GiPencil } from "react-icons/gi";
import { FiEye, FiTrash } from "react-icons/fi";

const WorkflowPage = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR(`/api/workflow`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });
  const openWorkflow = (workflowId: string) => {
    router.push(`/workflow/${workflowId}`);
  };
  const createWorkflow = async () => {
    const response = await axios.post("/api/workflow");
    openWorkflow(response.data.workflow.id);
  };

  return (
    <div className="p-16 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="font-bold text-2xl">Flows</div>
        <Button onClick={createWorkflow}>Create Workflow</Button>
      </div>
      <div className="flex justify-end">
        <div>
          <Input placeholder="Search" />
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Apps</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <div className="flex flex-col gap-2">
                          <Skeleton className="w-32 h-4" />
                          <Skeleton className="w-24 h-3" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="w-20 h-4" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="w-28 h-4" />
                    </TableCell>
                    <TableCell className="py-4">
                      <Skeleton className="w-6 h-4" />
                    </TableCell>
                  </TableRow>
                ))
              : data?.workflows?.map((workflow: any) => (
                  <TableRow key={workflow.id}>
                    <TableCell
                      className="cursor-pointer py-4"
                      onClick={() => openWorkflow(workflow.id)}
                    >
                      {workflow.name}
                    </TableCell>
                    <TableCell className="py-4 flex items-center">
                      {workflow?.node?.length > 0 ? (
                        workflow?.node?.map((node: Node) => (
                          <span
                            key={node.id}
                            className="border rounded h-7 w-7 flex justify-center items-center"
                          >
                            <NodeIcon name={node.type} size={15} />
                          </span>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-xs">
                          No Apps
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{new Date().toLocaleString()}</TableCell>
                    <TableCell>
                      <Switch />
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="cursor-pointer" variant="ghost">
                            <CiMenuKebab />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-1 m-0" align="end">
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="ghost"
                              className="flex items-center justify-start gap-4"
                            >
                              <FiEye />
                              <span>View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex items-center justify-start gap-4"
                            >
                              <GiPencil />
                              <span>Rename</span>
                            </Button>
                            <Button
                              variant="ghost"
                              className="flex items-center justify-start gap-4"
                            >
                              <FiTrash />
                              <span>Delete</span>
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkflowPage;
