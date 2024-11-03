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
    {
      id: 24,
      name: "January Poll Analysis",
      value: 40,
      startDate: createDate(1, 25),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 36,
      name: "Early State Campaign Strategies",
      value: 38,
      startDate: createDate(1, 10),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 37,
      name: "Candidate Fundraising Announcements",
      value: 32,
      startDate: createDate(1, 20),
      decayRate: 0.018,
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
    {
      id: 25,
      name: "February Fundraising Totals",
      value: 38,
      startDate: createDate(2, 18),
      decayRate: 0.018,
      type: "article",
    },
    {
      id: 38,
      name: "Candidate Endorsements in February",
      value: 36,
      startDate: createDate(2, 12),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 39,
      name: "Debate in South Carolina",
      value: 42,
      startDate: createDate(2, 26),
      decayRate: 0.015,
      type: "event",
      category: "political",
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
    {
      id: 26,
      name: "Mid-March Polls",
      value: 37,
      startDate: createDate(3, 15),
      decayRate: 0.018,
      type: "article",
    },
    {
      id: 40,
      name: "March Debate Highlights",
      value: 34,
      startDate: createDate(3, 18),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 41,
      name: "Key Endorsements in March",
      value: 39,
      startDate: createDate(3, 25),
      decayRate: 0.018,
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
    {
      id: 27,
      name: "Campaign Finance Reports Released",
      value: 42,
      startDate: createDate(4, 20),
      decayRate: 0.018,
      type: "article",
    },
    {
      id: 42,
      name: "April Debate Analysis",
      value: 38,
      startDate: createDate(4, 15),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 43,
      name: "State-by-State Polls in April",
      value: 36,
      startDate: createDate(4, 25),
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
    {
      id: 28,
      name: "Early May Polling Trends",
      value: 39,
      startDate: createDate(5, 5),
      decayRate: 0.018,
      type: "article",
    },
    {
      id: 44,
      name: "May Policy Discussions",
      value: 35,
      startDate: createDate(5, 20),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 45,
      name: "May Voter Sentiment Reports",
      value: 33,
      startDate: createDate(5, 25),
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
    {
      id: 29,
      name: "Analysis of Debate Strategies",
      value: 34,
      startDate: createDate(6, 20),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 46,
      name: "June Fundraising Totals",
      value: 38,
      startDate: createDate(6, 15),
      decayRate: 0.018,
      type: "article",
    },
    {
      id: 47,
      name: "June Campaign Ads Analysis",
      value: 36,
      startDate: createDate(6, 25),
      decayRate: 0.02,
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
    {
      id: 30,
      name: "July Polling Data",
      value: 33,
      startDate: createDate(7, 10),
      decayRate: 0.018,
      type: "article",
    },
    {
      id: 48,
      name: "July Campaign Strategies",
      value: 35,
      startDate: createDate(7, 15),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 49,
      name: "Key Speeches in July",
      value: 36,
      startDate: createDate(7, 25),
      decayRate: 0.018,
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
    {
      id: 31,
      name: "Late August Strategy Memo",
      value: 36,
      startDate: createDate(8, 25),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 50,
      name: "August Debate Preparations",
      value: 34,
      startDate: createDate(8, 12),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 51,
      name: "August Campaign Trail Highlights",
      value: 38,
      startDate: createDate(8, 20),
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
    {
      id: 32,
      name: "September Voter Sentiment Analysis",
      value: 41,
      startDate: createDate(9, 15),
      decayRate: 0.018,
      type: "article",
    },
    {
      id: 52,
      name: "September Campaign Finance Reports",
      value: 39,
      startDate: createDate(9, 18),
      decayRate: 0.02,
      type: "article",
    },
    {
      id: 53,
      name: "September Key Policy Announcements",
      value: 35,
      startDate: createDate(9, 25),
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
    {
      id: 33,
      name: "October Debate Fact-Check",
      value: 39,
      startDate: createDate(10, 22),
      decayRate: 0.018,
      type: "article",
    },
    {
      id: 54,
      name: "October Swing State Polls",
      value: 40,
      startDate: createDate(10, 25),
      decayRate: 0.018,
      type: "article",
    },
    {
      id: 55,
      name: "October Debate Strategy Review",
      value: 38,
      startDate: createDate(10, 10),
      decayRate: 0.02,
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
    {
      source: 1,
      target: 24,
      value: 3,
      startDate: createDate(1, 25),
      decayRate: 0.02,
    },
    {
      source: 24,
      target: 36,
      value: 3,
      startDate: createDate(1, 10),
      decayRate: 0.02,
    },
    {
      source: 36,
      target: 37,
      value: 4,
      startDate: createDate(1, 20),
      decayRate: 0.018,
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
    {
      source: 3,
      target: 25,
      value: 4,
      startDate: createDate(2, 18),
      decayRate: 0.018,
    },
    {
      source: 25,
      target: 38,
      value: 4,
      startDate: createDate(2, 12),
      decayRate: 0.02,
    },
    {
      source: 38,
      target: 39,
      value: 5,
      startDate: createDate(2, 26),
      decayRate: 0.015,
    },

    // March Connections
    {
      source: 2,
      target: 4,
      value: 4,
      startDate: createDate(3, 5),
      decayRate: 0.01,
    },
    {
      source: 4,
      target: 5,
      value: 3,
      startDate: createDate(3, 6),
      decayRate: 0.022,
    },
    {
      source: 5,
      target: 26,
      value: 4,
      startDate: createDate(3, 15),
      decayRate: 0.018,
    },
    {
      source: 26,
      target: 40,
      value: 4,
      startDate: createDate(3, 18),
      decayRate: 0.02,
    },
    {
      source: 40,
      target: 41,
      value: 4,
      startDate: createDate(3, 25),
      decayRate: 0.018,
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
    {
      source: 7,
      target: 27,
      value: 4,
      startDate: createDate(4, 20),
      decayRate: 0.018,
    },
    {
      source: 27,
      target: 42,
      value: 4,
      startDate: createDate(4, 15),
      decayRate: 0.02,
    },
    {
      source: 42,
      target: 43,
      value: 4,
      startDate: createDate(4, 25),
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
    {
      source: 9,
      target: 28,
      value: 4,
      startDate: createDate(5, 5),
      decayRate: 0.018,
    },
    {
      source: 28,
      target: 44,
      value: 4,
      startDate: createDate(5, 20),
      decayRate: 0.02,
    },
    {
      source: 44,
      target: 45,
      value: 3,
      startDate: createDate(5, 25),
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
    {
      source: 11,
      target: 29,
      value: 4,
      startDate: createDate(6, 20),
      decayRate: 0.02,
    },
    {
      source: 29,
      target: 46,
      value: 4,
      startDate: createDate(6, 15),
      decayRate: 0.018,
    },
    {
      source: 46,
      target: 47,
      value: 4,
      startDate: createDate(6, 25),
      decayRate: 0.02,
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
    {
      source: 13,
      target: 30,
      value: 4,
      startDate: createDate(7, 10),
      decayRate: 0.018,
    },
    {
      source: 30,
      target: 48,
      value: 4,
      startDate: createDate(7, 15),
      decayRate: 0.02,
    },
    {
      source: 48,
      target: 49,
      value: 3,
      startDate: createDate(7, 25),
      decayRate: 0.018,
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
    {
      source: 15,
      target: 31,
      value: 4,
      startDate: createDate(8, 25),
      decayRate: 0.02,
    },
    {
      source: 31,
      target: 50,
      value: 4,
      startDate: createDate(8, 12),
      decayRate: 0.02,
    },
    {
      source: 50,
      target: 51,
      value: 4,
      startDate: createDate(8, 20),
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
    {
      source: 17,
      target: 32,
      value: 4,
      startDate: createDate(9, 15),
      decayRate: 0.018,
    },
    {
      source: 32,
      target: 52,
      value: 4,
      startDate: createDate(9, 18),
      decayRate: 0.02,
    },
    {
      source: 52,
      target: 53,
      value: 3,
      startDate: createDate(9, 25),
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
    {
      source: 19,
      target: 33,
      value: 4,
      startDate: createDate(10, 22),
      decayRate: 0.018,
    },
    {
      source: 33,
      target: 54,
      value: 4,
      startDate: createDate(10, 25),
      decayRate: 0.018,
    },
    {
      source: 54,
      target: 55,
      value: 3,
      startDate: createDate(10, 10),
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
