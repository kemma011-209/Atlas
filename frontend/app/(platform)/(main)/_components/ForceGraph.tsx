// app/(platform)/(main)/_components/ForceGraph.tsx
"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { X } from "lucide-react";
import useGraphStore from "@/stores/graphStore";
import type { TemporalNode, TemporalLink } from "../data";

interface ForceGraphProps {
  graphData: {
    nodes: TemporalNode[];
    links: TemporalLink[];
  };
}

const ForceGraph = ({ graphData }: ForceGraphProps) => {
  const { hideArticles, hiddenNodes, hideNode, setVisibleNodes } =
    useGraphStore();
  const svgRef = useRef(null);

  // Filter nodes based on hideArticles and hiddenNodes with cascade effect
  const filteredData = React.useMemo(() => {
    // Helper function to get all connected nodes for a given node
    const getConnectedNodes = (
      nodeId: number,
      links: TemporalLink[]
    ): Set<number> => {
      const connected = new Set<number>();
      links.forEach((link) => {
        if (
          link.source === nodeId ||
          (typeof link.source === "object" && link.source.id === nodeId)
        ) {
          connected.add(
            typeof link.target === "number" ? link.target : link.target.id
          );
        }
        if (
          link.target === nodeId ||
          (typeof link.target === "object" && link.target.id === nodeId)
        ) {
          connected.add(
            typeof link.source === "number" ? link.source : link.source.id
          );
        }
      });
      return connected;
    };

    // Initial node filtering based on explicit hide conditions
    let nodesToHide = new Set(hiddenNodes);
    if (hideArticles) {
      graphData.nodes
        .filter((node) => node.type === "article")
        .forEach((node) => nodesToHide.add(node.id));
    }

    // Keep track of nodes that should remain visible
    let visibleNodes = new Set<number>();
    let hasChanges = true;

    // Iteratively filter nodes until no more changes occur
    while (hasChanges) {
      hasChanges = false;

      // Start with all nodes that aren't explicitly hidden
      const currentVisible = new Set<number>(
        graphData.nodes
          .filter((node) => !nodesToHide.has(node.id))
          .map((node) => node.id)
      );

      // For each potentially visible node
      for (const nodeId of currentVisible) {
        const connectedNodes = getConnectedNodes(nodeId, graphData.links);
        const hasVisibleConnections = Array.from(connectedNodes).some(
          (connectedId) => !nodesToHide.has(connectedId)
        );

        // If a node has no visible connections (except for initial events)
        const node = graphData.nodes.find((n) => n.id === nodeId);
        if (!hasVisibleConnections && node?.type === "article") {
          if (!nodesToHide.has(nodeId)) {
            nodesToHide.add(nodeId);
            hasChanges = true;
          }
        } else if (hasVisibleConnections || node?.type === "event") {
          visibleNodes.add(nodeId);
        }
      }
    }

    // Filter nodes
    const filteredNodes = graphData.nodes.filter(
      (node) => !nodesToHide.has(node.id)
    );

    // Filter links - only keep links between visible nodes
    const filteredLinks = graphData.links.filter((link) => {
      const sourceId =
        typeof link.source === "number" ? link.source : link.source.id;
      const targetId =
        typeof link.target === "number" ? link.target : link.target.id;
      return !nodesToHide.has(sourceId) && !nodesToHide.has(targetId);
    });

    return {
      nodes: filteredNodes,
      links: filteredLinks,
    };
  }, [graphData, hideArticles, hiddenNodes]);

  // Update visible nodes in store
  useEffect(() => {
    setVisibleNodes(filteredData.nodes);
  }, [filteredData.nodes, setVisibleNodes]);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const container = d3.select(svgRef.current).node().parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Separate color scales for events and articles
    const eventColorScale = d3
      .scaleSequential()
      .domain([
        0,
        d3.max(
          filteredData.nodes.filter((n) => n.type === "event"),
          (d) => d.value
        ) || 0,
      ])
      .interpolator(d3.interpolateBlues);

    const articleColorScale = d3
      .scaleSequential()
      .domain([
        0,
        d3.max(
          filteredData.nodes.filter((n) => n.type === "article"),
          (d) => d.value
        ) || 0,
      ])
      .interpolator(d3.interpolateGreens);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
    // Define markers for streaming effect
    const defs = svg.append("defs");

    // Create gradient for the streaming effect
    const gradient = defs
      .append("linearGradient")
      .attr("id", "stream-gradient")
      .attr("gradientUnits", "userSpaceOnUse");

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#fff")
      .attr("stop-opacity", 0.8);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#fff")
      .attr("stop-opacity", 0.2);

    const simulation = d3
      .forceSimulation(filteredData.nodes)
      .force(
        "link",
        d3
          .forceLink(filteredData.links)
          .id((d) => d.id)
          .distance((d) => {
            return d.source.type === "article" || d.target.type === "article"
              ? 150
              : 100;
          })
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3.forceCollide().radius((d) => Math.sqrt(d.value) * 2.5)
      );

    // Create container for links
    const linkContainer = svg.append("g");

    // Create regular links
    const regularLinks = linkContainer
      .selectAll(".link-regular")
      .data(filteredData.links.filter((d) => !d.animated))
      .join("line")
      .attr("class", "link-regular")
      .style("stroke", "#444")
      .style("stroke-width", (d) => Math.max(1, Math.sqrt(d.value) * 0.5))
      .style("opacity", 0.4);

    // Create animated links
    const animatedLinks = linkContainer
      .selectAll(".link-animated")
      .data(filteredData.links.filter((d) => d.animated))
      .join("g")
      .attr("class", "link-animated");

    // Base line for animated links
    animatedLinks
      .append("line")
      .style("stroke", "#444")
      .style("stroke-width", (d) => Math.max(1, Math.sqrt(d.value) * 0.5))
      .style("opacity", 0.2);

    // Animated streaming effect
    animatedLinks
      .append("line")
      .style("stroke", "#fff")
      .style("stroke-width", (d) => Math.max(1.5, Math.sqrt(d.value) * 0.75))
      .style("stroke-dasharray", "4,16")
      .style("opacity", 0.6)
      .style("stroke-linecap", "round")
      .each(function (d) {
        const speed = 1 / (d.value || 1);
        d3.select(this)
          .append("animate")
          .attr("attributeName", "stroke-dashoffset")
          .attr("values", "20;0")
          .attr("dur", `${speed * 2}s`)
          .attr("repeatCount", "indefinite");
      });

    // Create node groups
    const nodeGroups = svg
      .append("g")
      .selectAll("g")
      .data(filteredData.nodes)
      .join("g")
      .call(drag(simulation));

    // Add circles for nodes
    nodeGroups
      .append("circle")
      .attr("r", (d) => Math.sqrt(d.value) * 2)
      .style("fill", (d) =>
        d.type === "event"
          ? eventColorScale(d.value)
          : articleColorScale(d.value)
      )
      .style("stroke", (d) => (d.type === "event" ? "#fff" : "#ddd"))
      .style("stroke-width", (d) => (d.type === "event" ? 2 : 1))
      .style("stroke-opacity", 0.4);

    // Add remove button
    const removeButton = nodeGroups
      .append("g")
      .attr("class", "remove-button")
      .attr(
        "transform",
        (d) =>
          `translate(${Math.sqrt(d.value) * 2 - 8}, ${
            -Math.sqrt(d.value) * 2 + 8
          })`
      )
      .style("display", "none")
      .style("cursor", "pointer")
      .on("click", (event, d) => {
        event.stopPropagation();
        hideNode(d.id);
      });

    removeButton
      .append("circle")
      .attr("r", 8)
      .style("fill", "#374151")
      .style("stroke", "#fff")
      .style("stroke-width", 1)
      .style("stroke-opacity", 0.4);

    removeButton
      .append("path")
      .attr("d", "M6.7 6.7L1.3 1.3M6.7 1.3L1.3 6.7")
      .style("stroke", "#fff")
      .style("stroke-width", 1.5)
      .style("stroke-linecap", "round");

    // Add labels
    const labels = nodeGroups
      .append("text")
      .text((d) => d.name)
      .attr("font-size", "10px")
      .attr("dx", 15)
      .attr("dy", 4)
      .style("fill", "#fff")
      .style("opacity", 0.7)
      .each(function (d) {
        const text = d3.select(this);
        const words = d.name.split(" ");
        const lineHeight = 12;
        let line = [];
        let lineNumber = 0;

        text.text(null);

        for (let word of words) {
          line.push(word);
          if (line.join(" ").length > 20) {
            text
              .append("tspan")
              .attr("x", 15)
              .attr("dy", lineNumber === 0 ? 4 : lineHeight)
              .text(line.join(" "));
            line = [];
            lineNumber++;
          }
        }
        if (line.length > 0) {
          text
            .append("tspan")
            .attr("x", 15)
            .attr("dy", lineNumber === 0 ? 4 : lineHeight)
            .text(line.join(" "));
        }
      });

    // Show/hide remove button on hover
    nodeGroups
      .on("mouseenter", function () {
        d3.select(this).select(".remove-button").style("display", null);
      })
      .on("mouseleave", function () {
        d3.select(this).select(".remove-button").style("display", "none");
      });

    simulation.on("tick", () => {
      regularLinks
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      animatedLinks
        .selectAll("line")
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      nodeGroups.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => {
      simulation.stop();
    };
  }, [filteredData, hideNode]);

  return (
    <div className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default ForceGraph;
