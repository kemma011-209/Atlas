import React from "react";
import {
  ArrowRightFromLine,
  Castle,
  CircleUserRound,
  DraftingCompass,
  FileStack,
  History,
  Plus,
  Settings,
  SlidersHorizontal,
  Type,
  X,
} from "lucide-react";

const Buttons = () => {
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

        {/* SlidersHorizontal Icon */}
        <div className="w-full aspect-square flex justify-center items-center p-2 group hover:bg-blue-950 transition duration-200">
          <SlidersHorizontal className="w-full h-full stroke-[0.8] text-blue-950 fill-blue-950 group-hover:text-white group-hover:fill-white transition duration-200" />
        </div>
      </div>
    </div>
  );
};

export default Buttons;
