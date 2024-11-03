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

    // April Events
    {
      id: 6,
      name: "Wisconsin Primary",
      value: 40,
      startDate: createDate(4, 7),
      decayRate: 0.02,
      type: "event",
      category: "political",
    },
    {
      id: 7,
      name: "Biden's Wisconsin Victory Speech",
      value: 30,
      startDate: createDate(4, 8),
      decayRate: 0.018,
      type: "article",
    },

    // May Events
    {
      id: 8,
      name: "Mid-Year Campaign Fundraising",
      value: 48,
      startDate: createDate(5, 15),
      decayRate: 0.012,
      type: "event",
      category: "political",
    },
    {
      id: 9,
      name: "Analysis of Fundraising Impact",
      value: 32,
      startDate: createDate(5, 16),
      decayRate: 0.018,
      type: "article",
    },

    // June Events
    {
      id: 10,
      name: "June Democratic Debate",
      value: 43,
      startDate: createDate(6, 10),
      decayRate: 0.015,
      type: "event",
      category: "political",
    },
    {
      id: 11,
      name: "June Debate Highlights",
      value: 36,
      startDate: createDate(6, 11),
      decayRate: 0.022,
      type: "article",
    },

    // July Events
    {
      id: 12,
      name: "July Campaign Rally",
      value: 50,
      startDate: createDate(7, 20),
      decayRate: 0.015,
      type: "event",
      category: "political",
    },
    {
      id: 13,
      name: "Rally Analysis and Voter Reactions",
      value: 37,
      startDate: createDate(7, 21),
      decayRate: 0.02,
      type: "article",
    },

    // August Events
    {
      id: 14,
      name: "VP Selection Announcement",
      value: 60,
      startDate: createDate(8, 5),
      decayRate: 0.01,
      type: "event",
      category: "political",
    },
    {
      id: 15,
      name: "Analysis of VP Selection",
      value: 38,
      startDate: createDate(8, 6),
      decayRate: 0.018,
      type: "article",
    },

    // September Events
    {
      id: 16,
      name: "Presidential Debate",
      value: 65,
      startDate: createDate(9, 29),
      decayRate: 0.008,
      type: "event",
      category: "political",
    },
    {
      id: 17,
      name: "Debate Performance Review",
      value: 40,
      startDate: createDate(9, 30),
      decayRate: 0.018,
      type: "article",
    },

    // October Events
    {
      id: 18,
      name: "October Surprise Scandal",
      value: 70,
      startDate: createDate(10, 15),
      decayRate: 0.005,
      type: "event",
      category: "political",
    },
    {
      id: 19,
      name: "Scandal Analysis and Implications",
      value: 42,
      startDate: createDate(10, 16),
      decayRate: 0.02,
      type: "article",
    },

    // November Events
    {
      id: 20,
      name: "Election Day",
      value: 100,
      startDate: createDate(11, 3),
      decayRate: 0.003,
      type: "event",
      category: "political",
    },
    {
      id: 21,
      name: "Election Results Overview",
      value: 45,
      startDate: createDate(11, 4),
      decayRate: 0.02,
      type: "article",
    },

    // December Events
    {
      id: 22,
      name: "Post-Election Analysis",
      value: 50,
      startDate: createDate(12, 10),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 23,
      name: "Future Political Landscape Discussion",
      value: 40,
      startDate: createDate(12, 20),
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

    // April Connections
    {
      source: 4,
      target: 6,
      value: 4,
      startDate: createDate(4, 7),
      decayRate: 0.02,
    },
    {
      source: 6,
      target: 7,
      value: 3,
      startDate: createDate(4, 8),
      decayRate: 0.018,
    },

    // May Connections
    {
      source: 6,
      target: 8,
      value: 5,
      startDate: createDate(5, 15),
      decayRate: 0.012,
    },
    {
      source: 8,
      target: 9,
      value: 4,
      startDate: createDate(5, 16),
      decayRate: 0.018,
    },

    // June Connections
    {
      source: 8,
      target: 10,
      value: 6,
      startDate: createDate(6, 10),
      decayRate: 0.015,
    },
    {
      source: 10,
      target: 11,
      value: 4,
      startDate: createDate(6, 11),
      decayRate: 0.022,
    },

    // July Connections
    {
      source: 10,
      target: 12,
      value: 5,
      startDate: createDate(7, 20),
      decayRate: 0.015,
    },
    {
      source: 12,
      target: 13,
      value: 3,
      startDate: createDate(7, 21),
      decayRate: 0.02,
    },

    // August Connections
    {
      source: 12,
      target: 14,
      value: 6,
      startDate: createDate(8, 5),
      decayRate: 0.01,
    },
    {
      source: 14,
      target: 15,
      value: 3,
      startDate: createDate(8, 6),
      decayRate: 0.018,
    },

    // September Connections
    {
      source: 14,
      target: 16,
      value: 7,
      startDate: createDate(9, 29),
      decayRate: 0.008,
    },
    {
      source: 16,
      target: 17,
      value: 4,
      startDate: createDate(9, 30),
      decayRate: 0.018,
    },

    // October Connections
    {
      source: 16,
      target: 18,
      value: 8,
      startDate: createDate(10, 15),
      decayRate: 0.005,
    },
    {
      source: 18,
      target: 19,
      value: 4,
      startDate: createDate(10, 16),
      decayRate: 0.02,
    },

    // November Connections
    {
      source: 18,
      target: 20,
      value: 10,
      startDate: createDate(11, 3),
      decayRate: 0.003,
    },
    {
      source: 20,
      target: 21,
      value: 5,
      startDate: createDate(11, 4),
      decayRate: 0.02,
    },

    // December Connections
    {
      source: 20,
      target: 22,
      value: 6,
      startDate: createDate(12, 10),
      decayRate: 0.02,
    },
    {
      source: 22,
      target: 23,
      value: 4,
      startDate: createDate(12, 20),
      decayRate: 0.022,
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
