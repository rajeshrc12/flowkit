"use client";
import React from "react";
import { HomeIcon, KeyIcon } from "lucide-react";
import ActiveLink from "@/components/active-link";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";

const links = [
  {
    href: "/workflow",
    icon: <HomeIcon />,
    name: "Workflow",
  },
  {
    href: "/credential",
    icon: <KeyIcon />,
    name: "Connections",
  },
];
const Sidebar = () => {
  return (
    <div className="sticky group flex w-[48px] hover:w-[200px] flex-col gap-3 shadow h-screen overflow-hidden p-2 transition-all duration-300">
      <Button className="flex items-center gap-2 overflow-hidden">
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
