import Sidebar from "@/components/sidebar";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 h-full">{children}</div>
      <Toaster />
    </div>
  );
};

export default AuthLayout;
