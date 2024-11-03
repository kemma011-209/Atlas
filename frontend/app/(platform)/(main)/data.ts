// app/(platform)/(main)/_components/types/data.ts

export interface TemporalNode {
  id: number;
  name: string;
  value: number;
  startDate: string;
  decayRate: number;
  type: "event" | "article";
  category?: string;
}

export interface TemporalLink {
  source: number;
  target: number;
  value: number;
  startDate: string;
  decayRate: number;
  animated?: boolean;
}

const createDate = (month: number, day: number) =>
  `2024-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;

export const temporalGraphData = {
  nodes: [
    // January Events
    {
      id: 0,
      name: "Iowa Republican Caucus",
      value: 50,
      startDate: createDate(1, 15),
      decayRate: 0.015,
      type: "event",
      category: "political",
    },
    {
      id: 1,
      name: "Trump's Iowa Victory Speech Analysis",
      value: 35,
      startDate: createDate(1, 16),
      decayRate: 0.02,
      type: "article",
    },

    // February Events
    {
      id: 2,
      name: "New Hampshire Primary",
      value: 45,
      startDate: createDate(2, 5),
      decayRate: 0.015,
      type: "event",
      category: "political",
    },
    {
      id: 3,
      name: "Haley's Campaign Strategy Shift",
      value: 30,
      startDate: createDate(2, 6),
      decayRate: 0.025,
      type: "article",
    },

    // March Events
    {
      id: 4,
      name: "Super Tuesday Elections",
      value: 55,
      startDate: createDate(3, 5),
      decayRate: 0.01,
      type: "event",
      category: "political",
    },
    {
      id: 5,
      name: "Super Tuesday Results Analysis",
      value: 35,
      startDate: createDate(3, 6),
      decayRate: 0.022,
      type: "article",
    },
  ],
  links: [
    // January Connections
    {
      source: 0,
      target: 1,
      value: 4,
      startDate: createDate(1, 16),
      decayRate: 0.02,
    },

    // February Connections
    {
      source: 0,
      target: 2,
      value: 5,
      startDate: createDate(2, 5),
      decayRate: 0.015,
    },
    {
      source: 2,
      target: 3,
      value: 3,
      startDate: createDate(2, 6),
      decayRate: 0.02,
    },

    // March Connections
    {
      source: 2,
      target: 4,
      value: 4,
      startDate: createDate(3, 5),
      decayRate: 0.015,
    },
    {
      source: 4,
      target: 5,
      value: 3,
      startDate: createDate(3, 6),
      decayRate: 0.02,
    },
  ],
};

export const getGraphStateAtDate = (date: string) => {
  const currentDate = new Date(date);
  const VISIBILITY_THRESHOLD = 0.15; // Nodes/links disappear below 15% strength

  // Filter and transform nodes based on date and decay
  const activeNodes = temporalGraphData.nodes
    .filter((node) => {
      const nodeStart = new Date(node.startDate);
      if (nodeStart > currentDate) return false;

      const daysSinceStart =
        (currentDate.getTime() - nodeStart.getTime()) / (1000 * 60 * 60 * 24);
      const decayFactor = 1 - daysSinceStart * node.decayRate;

      return decayFactor > VISIBILITY_THRESHOLD;
    })
    .map((node) => {
      const daysSinceStart =
        (currentDate.getTime() - new Date(node.startDate).getTime()) /
        (1000 * 60 * 60 * 24);
      const decayFactor = 1 - daysSinceStart * node.decayRate;

      return {
        ...node,
        value: node.value * decayFactor,
      };
    });

  // Get active node IDs for filtering links
  const activeNodeIds = new Set(activeNodes.map((n) => n.id));

  // Filter and transform links
  const activeLinks = temporalGraphData.links
    .filter((link) => {
      const linkStart = new Date(link.startDate);
      if (linkStart > currentDate) return false;

      // Check if both source and target nodes are still active
      if (!activeNodeIds.has(link.source) || !activeNodeIds.has(link.target))
        return false;

      const daysSinceStart =
        (currentDate.getTime() - linkStart.getTime()) / (1000 * 60 * 60 * 24);
      const decayFactor = 1 - daysSinceStart * link.decayRate;

      return decayFactor > VISIBILITY_THRESHOLD;
    })
    .map((link) => {
      const daysSinceStart =
        (currentDate.getTime() - new Date(link.startDate).getTime()) /
        (1000 * 60 * 60 * 24);
      const decayFactor = 1 - daysSinceStart * link.decayRate;

      // Determine if link should be animated (event-to-event)
      const sourceNode = temporalGraphData.nodes.find(
        (n) => n.id === link.source
      );
      const targetNode = temporalGraphData.nodes.find(
        (n) => n.id === link.target
      );
      const animated =
        sourceNode?.type === "event" && targetNode?.type === "event";

      return {
        ...link,
        value: link.value * decayFactor,
        animated,
      };
    });

  return { nodes: activeNodes, links: activeLinks };
};
