"use client";
import React, { useState } from "react";
import ForceGraph from "./_components/ForceGraph";
import { graphData } from "./data";
import { ChevronsUpDown } from "lucide-react";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2022);

  const years = [2022, 2023, 2024];

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full flex-grow bg-zinc-900 relative overflow-hidden">
        <div className="w-48 h-80 bg-white rounded top-8 right-2 absolute z-10"></div>
        <ForceGraph graphData={graphData} />
      </div>
      <div className="w-full h-16 bg-zinc-700 border-t border-zinc-600 flex-shrink-0">
        <div className="w-full h-full flex">
          <div className="h-full w-24 p-2 border-r border-zinc-400 flex space-x-2 relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full h-full flex items-center group"
            >
              <div className="flex flex-col text-white space-y-1">
                <p className="text-sm text-zinc-300">Year</p>
                <p className="text-lg text-zinc-100">{selectedYear}</p>
              </div>
              <div className="h-full w-12 flex justify-center items-center">
                <ChevronsUpDown className="stroke-[0.8] text-zinc-100 transition-transform duration-200 group-hover:scale-110" />
              </div>
            </button>

            {isOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-24 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 text-zinc-100 hover:bg-zinc-700 transition-colors duration-150 text-left"
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Page;
