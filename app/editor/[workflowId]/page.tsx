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
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import GraphBoard from "@/components/graph-board";
import { useDispatch } from "react-redux";
import { initNodes } from "@/app/slices/nodeSlice";

const WorkflowPage = () => {
  const { workflowId } = useParams();
  const dispatch = useDispatch();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([
    {
      id: "graph_board",
      type: "graph_board",
      position: { x: 300, y: 100 },
      data: {
        label: "Google Sheets",
      },
      dragHandle: ".drag-handle__custom",
    },
  ]);
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
  // console.log(data);

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

  useEffect(() => {
    if (data) {
      setName(data.name);
      if (data.node) {
        dispatch(initNodes(data.node || []));
      }
    }
  }, [data]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={{
        graph_board: GraphBoard,
      }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default WorkflowPage;
