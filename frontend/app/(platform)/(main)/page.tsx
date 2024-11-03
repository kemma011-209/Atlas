"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChartLine, ChevronsUpDown, X } from "lucide-react";
import ForceGraph from "./_components/ForceGraph";
import { getGraphStateAtDate } from "./data";
import useGraphStore from "@/stores/graphStore";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import { sentimentData } from "./semantics";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [isDragging, setIsDragging] = useState(false);
  const [showSentiment, setShowSentiment] = useState(false);
  const [currentGraphData, setCurrentGraphData] = useState(() =>
    getGraphStateAtDate("2024-01-01")
  );

  const sliderRef = useRef(null);
  const { sliderPosition, setSliderPosition, isAnimating } = useGraphStore();

  const years = [2024];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const calculateDate = (position) => {
    const dayOfYear = Math.floor((position / 100) * 365) + 1;
    let days = dayOfYear;
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let month = 0;

    while (days > monthDays[month]) {
      days -= monthDays[month];
      month++;
    }

    return {
      display: `${months[month]}, ${days}`,
      iso: `2024-${String(month + 1).padStart(2, "0")}-${String(days).padStart(
        2,
        "0"
      )}`,
    };
  };

  const handleMouseDown = (e) => {
    if (isAnimating) return;
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateSliderPosition(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const newPosition = Math.max(0, Math.min(100, (x / width) * 100));
      setSliderPosition(newPosition);
    }
  };

  useEffect(() => {
    const date = calculateDate(sliderPosition);
    const newGraphData = getGraphStateAtDate(date.iso);
    setCurrentGraphData(newGraphData);
  }, [sliderPosition]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-grow bg-zinc-900 relative overflow-hidden rounded-tl-2xl">
        <ForceGraph graphData={currentGraphData} />

        {/* Clickable sentiment button */}
        <button
          onClick={() => setShowSentiment(!showSentiment)}
          className="w-8 h-8 rounded absolute top-2 right-2 bg-zinc-300 border border-zinc-500 hover:bg-zinc-200 transition-colors duration-200 flex justify-center items-center"
        >
          <ChartLine className="h-5 w-5 stroke-[0.8]" />
        </button>

        {/* Sentiment Analysis Popup */}
        {showSentiment && (
          <div className="absolute top-12 right-2 w-[35rem] h-64 bg-zinc-800 rounded-lg border border-zinc-600 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-zinc-100 font-medium">Sentiment Analysis</h3>
              <button
                onClick={() => setShowSentiment(false)}
                className="text-zinc-400 hover:text-zinc-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="w-full h-48">
              <LineChart
                width={500}
                height={180}
                data={sentimentData.filter((d) => {
                  const date = calculateDate(sliderPosition).iso;
                  return d.date <= date.substring(0, 7);
                })}
              >
                <XAxis dataKey="date" />
                <YAxis domain={[-1, 1]} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  dot={false}
                />
              </LineChart>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-14 bg-zinc-700 border-t border-zinc-600 flex-shrink-0 flex relative">
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

        <div className="w-full h-full flex items-center justify-center relative overflow-visible">
          <div className="w-[calc(100%-3rem)] h-10 relative" ref={sliderRef}>
            <div className="absolute top-0 w-full h-[1px] bg-zinc-500" />
            <div className="absolute bottom-0 w-full h-[1px] bg-zinc-500" />

            {months.map((month, index) => (
              <div
                key={month}
                className="absolute h-full flex flex-col justify-between items-center"
                style={{
                  left: `${(index * 100) / (months.length - 1)}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div>
                  <div className="w-[1px] h-1.5 bg-zinc-500" />
                  {index % 2 === 0 && (
                    <span className="text-[10px] text-zinc-400 mt-0.5">
                      {month}
                    </span>
                  )}
                </div>
                <div className="w-[1px] h-1.5 bg-zinc-500" />
              </div>
            ))}

            <div
              className="absolute top-0 -translate-y-4 cursor-pointer z-10"
              style={{
                left: `${sliderPosition}%`,
                transform: "translateX(-50%)",
              }}
              onMouseDown={handleMouseDown}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-100 text-xs px-2 py-1 rounded whitespace-nowrap z-20">
                {calculateDate(sliderPosition).display}
              </div>
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <div className="w-0.5 h-4 bg-blue-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
