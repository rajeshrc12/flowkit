import React from "react";
import Image from "next/image";
import { FiFilter } from "react-icons/fi";

const NodeIcon = ({ name, size = 10 }: { name: string; size?: number }) => {
  if (name === "google_sheets") {
    return (
      <Image src="/icons/google-sheets.svg" height={size} width={size} alt="" />
    );
  }
  if (name === "gmail") {
    return <Image src="/icons/gmail.svg" height={size} width={size} alt="" />;
  }
  if (name === "slack") {
    return <Image src="/icons/slack.svg" height={size} width={size} alt="" />;
  }
  if (name === "google_drive") {
    return (
      <Image src="/icons/google-drive.svg" height={size} width={size} alt="" />
    );
  }
  if (name === "filter") {
    return <FiFilter size={size} color="orange" />;
  }
  return <div>NodeIcon</div>;
};

export default NodeIcon;
