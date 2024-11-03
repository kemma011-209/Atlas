import React from "react";
import { DraftingCompass, Share2 } from "lucide-react";
import useGraphStore from "@/stores/graphStore";

const Buttons = () => {
  const setGoesTrue = useGraphStore((state) => state.setGoesTrue);

  return (
    <div className="w-full h-full flex justify-between flex-col">
      {/* Top Buttons */}
      <div className="flex flex-col w-full">
        {/* DraftingCompass Icon */}
        <div className="relative group">
          {/* Icon Container */}
          <div className="w-full aspect-square flex justify-center items-center p-2 relative">
            <div className="w-[0.35rem] h-[0.35rem] bg-blue-950 rounded-full absolute top-2 right-2"></div>
            <DraftingCompass className="w-full h-full stroke-[0.8] text-blue-950 text-opacity-45" />
          </div>
        </div>
        {/* Share2 Icon */}
        <div className="w-full aspect-square flex justify-center items-center p-2 group hover:bg-blue-950 transition duration-200">
          <Share2
            className="w-full h-full stroke-[0.8] text-blue-950 fill-blue-950 group-hover:text-white group-hover:fill-white transition duration-200"
            onClick={(e) => {
              e.stopPropagation(); // Prevent event from bubbling up
              setGoesTrue();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Buttons;
