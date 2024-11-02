"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Sidebar from "./_components/sidebar/Sidebar";
import { useSidebarStore } from "@/stores/sidebarStore";

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isExpanded = useSidebarStore((state) => state.isExpanded);

  return (
    <div className="w-screen h-screen relative bg-stone-100">
      <Sidebar />
      {/* Main Content */}
      <motion.div
        className="w-full h-full overflow-auto"
        initial={false}
        animate={{ paddingLeft: isExpanded ? "15vw" : "3vw" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Layout;
