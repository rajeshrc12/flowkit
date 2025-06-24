"use client";
import React from "react";
import { HomeIcon, KeyIcon } from "lucide-react";
import ActiveLink from "@/components/active-link";

const links = [
  {
    href: "/workflow",
    icon: <HomeIcon />,
    name: "Workflow",
  },
  {
    href: "/credential",
    icon: <KeyIcon />,
    name: "Credential",
  },
];
const Sidebar = () => {
  return (
    <div className="h-screen w-[200px] flex flex-col gap-2 border-r">
      <div className="font-bold text-2xl flex justify-center">Flowkit</div>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <ActiveLink key={link.name} {...link} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
