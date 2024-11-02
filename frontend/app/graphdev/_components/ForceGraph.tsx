"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { graphData } from "../data";
import type { Node, Link } from "../data";

const ForceGraph = ({ graphData }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();

    const container = d3.select(svgRef.current).node().parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const colorScale = d3
      .scaleSequential()
      .domain([0, d3.max(graphData.nodes, (d) => d.value)])
      .interpolator(d3.interpolateViridis);

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const simulation = d3
      .forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.links).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(30));

    const link = svg
      .append("g")
      .selectAll("line")
      .data(graphData.links)
      .join("line")
      .style("stroke", "#444")
      .style("stroke-width", 1)
      .style("opacity", 0.6);

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(graphData.nodes)
      .join("circle")
      .attr("r", (d) => Math.sqrt(d.value) * 2)
      .style("fill", (d) => colorScale(d.value))
      .call(drag(simulation));

    const labels = svg
      .append("g")
      .selectAll("text")
      .data(graphData.nodes)
      .join("text")
      .text((d) => d.name)
      .attr("font-size", "10px")
      .attr("dx", 15)
      .attr("dy", 4)
      .style("fill", "#fff")
      .style("opacity", 0.7);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

      labels.attr("x", (d) => d.x).attr("y", (d) => d.y);
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
  }, [graphData]);

  return (
    <div className="relative w-full h-full">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default ForceGraph;
