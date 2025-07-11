"use client";
import React from "react";
import { TbSettingsAutomation } from "react-icons/tb";
import { TbApps } from "react-icons/tb";
import ActiveLink from "@/components/active-link";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";

const links = [
  {
    href: "/workflow",
    icon: <TbSettingsAutomation />,
    name: "Workflow",
  },
  {
    href: "/credential",
    icon: <TbApps />,
    name: "App Connections",
  },
];
const Sidebar = () => {
  const router = useRouter();

  const createWorkflow = async () => {
    const response = await axios.post("/api/workflow");
    router.push(`/editor/${response.data.workflow.id}`);
  };
  return (
    <div className="sticky group flex w-[48px] hover:w-[200px] flex-col gap-3 shadow h-screen overflow-hidden p-2 transition-all duration-300">
      <Button
        className="flex items-center gap-2 overflow-hidden"
        onClick={createWorkflow}
      >
        <FiPlus />
        <span className="whitespace-nowrap hidden group-hover:inline transition-opacity duration-100">
          Create
        </span>
      </Button>

      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <ActiveLink key={link.name} {...link} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
