import Sidebar from "@/components/sidebar";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
      <Toaster />
    </div>
  );
};

export default AuthLayout;
