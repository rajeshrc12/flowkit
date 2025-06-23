import Sidebar from "@/components/sidebar";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
