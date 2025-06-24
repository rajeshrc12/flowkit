"use client";
import React, { useCallback } from "react";
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
import Google from "@/components/node/model/google";
import AddNode from "@/components/add-node";

const WorkflowPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const handleAddNode = (node: Node) => {
    setNodes((prevNodes) => [...prevNodes, node]);
  };
  const onConnect = useCallback((connection: Connection) => {
    const edge: Edge = {
      ...connection,
      animated: true,
      id: `edge-${connection.sourceHandle}-${connection.targetHandle}`,
      sourceHandle: connection.sourceHandle ?? null,
      targetHandle: connection.targetHandle ?? null,
    };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="h-[10%] bg-white border-b flex justify-between items-center px-5 flex justify-between">
        <div className="font-bold text-2xl">Workflow</div>
        <AddNode handleAddNode={handleAddNode} />
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
            google: Google,
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
