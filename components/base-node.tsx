import React from "react";
import GoogleSheets from "@/components/node/google-sheets";
import Slack from "@/components/node/slack";

interface BaseNodeProps {
  type: string;
  index: number;
  id: string;
}
const BaseNode = ({ type, index, id }: BaseNodeProps) => {
  if (type === "google_sheets") {
    return <GoogleSheets index={index} id={id} />;
  }
  if (type === "slack") {
    return <Slack index={index} id={id} />;
  }
  return <div>BaseNode</div>;
};

export default BaseNode;
