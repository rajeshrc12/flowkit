import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import GoogleSheets from "@/components/edit-node/google-sheets";
import Slack from "@/components/edit-node/slack";
import Filter from "@/components/edit-node/filter";

const EditNodeIndex = () => {
  const node = useSelector((state: RootState) => state.node);
  if (node?.editNode?.type === "google_sheets") return <GoogleSheets />;
  if (node?.editNode?.type === "slack") return <Slack />;
  if (node?.editNode?.type === "filter") return <Filter />;
};

export default EditNodeIndex;
