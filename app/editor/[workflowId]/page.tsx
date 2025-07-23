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
import GraphBoard from "@/components/graph-board";

const WorkflowPage = () => {
  const [nodes, , onNodesChange] = useNodesState<Node>([
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
