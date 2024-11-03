// app/(platform)/_components/sidebar/ExpandedArea.tsx
import React from "react";
import { Eye, EyeOff, RotateCcw, Download } from "lucide-react";
import useGraphStore from "@/stores/graphStore";

const ExpandedArea = () => {
  const {
    visibleNodes,
    currentLinks,
    hideNode,
    hideArticles,
    toggleHideArticles,
    resetVisibility,
  } = useGraphStore();

  const sortedNodes = [...visibleNodes].sort((a, b) => b.value - a.value);

  const exportToNeo4j = () => {
    let cypherQueries = "";

    // Create nodes first
    const eventNodes = visibleNodes.filter((node) => node.type === "event");
    const articleNodes = visibleNodes.filter((node) => node.type === "article");

    // Export events
    eventNodes.forEach((node) => {
      cypherQueries += `CREATE (e${node.id}:Event {
  id: ${node.id},
  name: "${node.name.replace(/"/g, '\\"')}",
  value: ${node.value},
  startDate: "${node.startDate}"
})\n`;
    });

    // Export articles
    articleNodes.forEach((node) => {
      cypherQueries += `CREATE (a${node.id}:Article {
  id: ${node.id},
  name: "${node.name.replace(/"/g, '\\"')}",
  value: ${node.value},
  startDate: "${node.startDate}"
})\n`;
    });

    // Get all visible links
    const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
    const visibleLinks = currentLinks.filter(
      (link) =>
        visibleNodeIds.has(link.source) && visibleNodeIds.has(link.target)
    );

    // Export relationships
    visibleLinks.forEach((link) => {
      const sourceNode = visibleNodes.find((n) => n.id === link.source);
      const targetNode = visibleNodes.find((n) => n.id === link.target);

      if (sourceNode && targetNode) {
        const sourcePrefix = sourceNode.type === "event" ? "e" : "a";
        const targetPrefix = targetNode.type === "event" ? "e" : "a";

        cypherQueries += `CREATE (${sourcePrefix}${link.source})-[:RELATES_TO {
  value: ${link.value},
  startDate: "${link.startDate}"
}]->(${targetPrefix}${link.target})\n`;
      }
    });

    // Create and download the file
    const blob = new Blob([cypherQueries], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `graph_export_${
      new Date().toISOString().split("T")[0]
    }.cypher`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header with article toggle */}
      <div className="w-full h-11 px-3 flex items-center justify-between border-b border-zinc-200">
        <span className="text-sm font-medium text-zinc-700">
          Visible Nodes ({sortedNodes.length})
        </span>
        <button
          onClick={toggleHideArticles}
          className="flex items-center space-x-1 px-2 py-1 rounded-md bg-zinc-200 hover:bg-zinc-300 transition-colors"
        >
          {hideArticles ? (
            <Eye className="w-3.5 h-3.5 text-zinc-700" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-zinc-700" />
          )}
          <span className="text-xs text-zinc-700">
            {hideArticles ? "Show Articles" : "Hide Articles"}
          </span>
        </button>
      </div>

      {/* Export button */}
      <div className="w-full h-11 px-3 flex items-center justify-between border-b border-zinc-200 bg-zinc-50">
        <span className="text-xs text-zinc-500">Export current graph</span>
        <button
          onClick={exportToNeo4j}
          className="flex items-center space-x-1 px-2 py-1 rounded-md bg-zinc-200 hover:bg-zinc-300 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-zinc-700" />
          <span className="text-xs text-zinc-700">Export Neo4j</span>
        </button>
      </div>

      {/* Reset visibility button */}
      <div className="w-full h-11 px-3 flex items-center justify-between border-b border-zinc-200 bg-zinc-50">
        <span className="text-xs text-zinc-500">Reset graph visibility</span>
        <button
          onClick={resetVisibility}
          className="flex items-center space-x-1 px-2 py-1 rounded-md bg-zinc-200 hover:bg-zinc-300 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-zinc-700" />
          <span className="text-xs text-zinc-700">Show All</span>
        </button>
      </div>

      {/* Node list */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-2 space-y-1.5">
          {sortedNodes.map((node) => (
            <div
              key={node.id}
              className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm"
            >
              <div className="flex flex-col mr-2 min-w-0">
                <span className="text-xs font-medium text-zinc-700 truncate">
                  {node.name}
                </span>
                <span className="text-[10px] text-zinc-500">
                  {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
                </span>
              </div>
              <button
                onClick={() => hideNode(node.id)}
                className="p-1 hover:bg-zinc-100 rounded transition-colors flex-shrink-0"
              >
                <EyeOff className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpandedArea;
