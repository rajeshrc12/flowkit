import React from "react";
import GoogleSheets from "@/components/node/google-sheets";
import Slack from "@/components/node/slack";
import { NodeData } from "@/types/node";

interface BaseNodeProps {
  type: string;
  index: number;
  id: string;
  data?: NodeData;
}
const BaseNode = ({ type, index, id, data }: BaseNodeProps) => {
  if (type === "google_sheets") {
    return <GoogleSheets index={index} id={id} data={data} />;
  }
  if (type === "slack") {
    return <Slack index={index} id={id} data={data} />;
  }
  return <div>BaseNode</div>;
};

export default BaseNode;
