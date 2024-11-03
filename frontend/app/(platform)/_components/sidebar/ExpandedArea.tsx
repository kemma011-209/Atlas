// app/(platform)/(main)/_components/ExpandedArea.tsx
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import useGraphStore from "@/stores/graphStore";

const ExpandedArea = () => {
  const { visibleNodes, hideNode, hideArticles, toggleHideArticles } =
    useGraphStore();

  const sortedNodes = [...visibleNodes].sort((a, b) => b.value - a.value);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-11 border-b border-zinc-500 flex items-center justify-between px-4">
        <div className="text-sm text-zinc-300">
          Visible Events ({sortedNodes.length})
        </div>
        <button
          onClick={toggleHideArticles}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          {hideArticles ? (
            <Eye className="w-4 h-4 text-zinc-300" />
          ) : (
            <EyeOff className="w-4 h-4 text-zinc-300" />
          )}
          <span className="text-sm text-zinc-300">
            {hideArticles ? "Show Articles" : "Hide Articles"}
          </span>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="p-4 space-y-2">
          {sortedNodes.map((node) => (
            <div
              key={node.id}
              className="flex items-center justify-between p-3 bg-zinc-800 rounded-md"
            >
              <div className="flex flex-col">
                <span className="text-sm text-zinc-200">{node.name}</span>
                <span className="text-xs text-zinc-400">
                  {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
                </span>
              </div>
              <button
                onClick={() => hideNode(node.id)}
                className="p-1 hover:bg-zinc-700 rounded transition-colors"
              >
                <EyeOff className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandedArea;
