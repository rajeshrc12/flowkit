"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import Chat from "@/components/node/chat";
import Agent from "@/components/node/agent";
import OpenAI from "@/components/node/model/openai";
import Gemini from "@/components/node/model/gemini";
import AddNode from "@/components/add-node";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import { toast } from "sonner";

const WorkflowPage = () => {
  const { workflowId } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [name, setName] = useState("");
  const { data, error, isLoading, mutate } = useSWR(
    workflowId ? `/api/workflow/${workflowId}` : null,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 0, // No polling
    }
  );
  const handleAddNode = (node: Node) => {
    setNodes((prevNodes) => [
      ...prevNodes,
      { ...node, id: new Date().getTime().toString() },
    ]);
  };
  const onConnect = useCallback((connection: Connection) => {
    const edge: Edge = {
      ...connection,
      animated: true,
      id: `edge-${connection.source}-${connection.sourceHandle}-${connection.target}-${connection.targetHandle}`,
      sourceHandle: connection.sourceHandle ?? null,
      targetHandle: connection.targetHandle ?? null,
    };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSave = async () => {
    const axios = require("axios");
    const response = await axios.patch("/api/workflow", {
      nodes,
      edges,
      name,
      workflowId,
    });
    mutate();
    toast("Workflow has been saved");
    console.log(response.data);
  };
  useEffect(() => {
    if (data) {
      setNodes(data.node || []);
      setEdges(data.edge || []);
      setName(data.name);
    }
  }, [data]);
  if (!data || isLoading) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Loading workflow...
      </p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        Error while loading workflow...
      </p>
    );
  }
  return (
    <div className="w-full h-screen">
      <div className="h-[10%] bg-white border-b flex justify-between items-center px-5 flex justify-between">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="font-bold"
        />
        <div className="flex gap-2">
          <Button variant="outline" onClick={onSave}>
            Save
          </Button>
          <AddNode handleAddNode={handleAddNode} />
        </div>
      </div>
      <div className="h-[90%]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={{
            chat: Chat,
            agent: Agent,
            openai: OpenAI,
            gemini: Gemini,
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

export default WorkflowPage;
