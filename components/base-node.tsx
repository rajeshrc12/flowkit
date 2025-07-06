import React from "react";
import GoogleSheets from "@/components/node/google-sheets";
import Slack from "@/components/node/slack";

interface BaseNodeProps {
  type: string;
  index: number;
}
const BaseNode = ({ type, index }: BaseNodeProps) => {
  if (type === "google_sheets") {
    return <GoogleSheets index={index} />;
  }
  if (type === "slack") {
    return <Slack index={index} />;
  }
  return <div>BaseNode</div>;
};

export default BaseNode;
