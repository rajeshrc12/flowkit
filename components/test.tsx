import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const Test = () => {
  const editNode = useSelector((state: RootState) => state.node.editNode);
  if (editNode.type === "google_sheets") return <div>Google sheets Test</div>;
  if (editNode.type === "slack") return <div>Slack Test</div>;
};

export default Test;
