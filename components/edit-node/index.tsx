import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import GoogleSheets from "@/components/edit-node/google-sheets";

const EditNodeIndex = () => {
  const node = useSelector((state: RootState) => state.node);
  if (node?.editNode?.type === "google_sheets") return <GoogleSheets />;
};

export default EditNodeIndex;
