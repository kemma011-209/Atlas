"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRightFromLine, Castle, Earth } from "lucide-react";
import { useSidebarStore } from "@/stores/sidebarStore";
import Buttons from "./Buttons";
import { usePathname } from "next/navigation";
import ExpandedArea from "./ExpandedArea";

const Sidebar: React.FC = () => {
  const isExpanded = useSidebarStore((state) => state.isExpanded);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const pathname = usePathname();

  // Check if the current route is "/"
  const isHomePage = pathname === "/";

  return (
    <div className="fixed top-0 left-0 h-full flex">
      {/* Icon Container */}
      <div className="w-11 h-full flex flex-col relative">
        {/* Castle Icon and Conditional Merlin Title */}
        <div className="fixed top-0 left-0 flex items-center z-50">
          <div className="w-11 aspect-square flex justify-center items-center p-2 bg-blue-950">
            <Earth className="w-full h-full stroke-[0.8] text-white " />
          </div>
        </div>

        {/* Button Area */}
        <div className="pt-11 w-full h-full flex flex-col">
          {/* Spacer and Arrow Icon */}
          <div
            className="w-full aspect-square flex justify-center items-center p-2 group hover:bg-blue-950 cursor-pointer"
            onClick={toggleSidebar}
            role="button"
            aria-expanded={isExpanded}
            aria-controls="expandable-sidebar"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleSidebar();
              }
            }}
          >
            <ArrowRightFromLine
              className={`w-full h-full stroke-[0.8] text-blue-950 fill-blue-950 group-hover:text-white group-hover:fill-white transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>
          <Buttons />
        </div>
      </div>

      {/* Expandable Div */}
      <motion.div
        id="expandable-sidebar"
        className="h-full bg-zinc-100"
        initial={false}
        animate={{
          width: isExpanded ? "12vw" : "0px",
          opacity: isExpanded ? 1 : 0,
          overflow: isExpanded ? "visible" : "hidden",
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2, ease: "easeInOut" },
          borderLeftColor: { duration: 0.2, ease: "easeInOut" },
          borderRightColor: { duration: 0.2, ease: "easeInOut" },
        }}
        style={{
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderStyle: "solid",
          padding: isExpanded ? "inherit" : "0",
        }}
      >
        {isExpanded && (
          <div className="w-full h-full ">
            <ExpandedArea />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Sidebar;
