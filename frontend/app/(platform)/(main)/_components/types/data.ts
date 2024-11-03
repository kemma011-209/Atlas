// types.ts
export interface Node {
  id: number;
  name: string;
  value: number; // Controls node size
}

export interface Link {
  source: number;
  target: number;
  value: number; // Controls streaming speed
  animated: boolean; // Whether to show streaming effect
  force?: number; // Optional: affects link distance/strength
}

export const graphData = {
  nodes: [
    { id: 0, name: "Node 0", value: 40 },
    { id: 1, name: "Node 1", value: 25 },
    { id: 2, name: "Node 2", value: 35 },
    { id: 3, name: "Node 3", value: 20 },
    { id: 4, name: "Node 4", value: 30 },
    { id: 5, name: "Node 5", value: 45 },
  ],
  links: [
    // Strong connections with data streaming
    {
      source: 0,
      target: 1,
      value: 3, // Fast streaming
      animated: true,
      force: 100, // Closer nodes
    },
    {
      source: 1,
      target: 2,
      value: 2, // Medium streaming
      animated: true,
      force: 150, // Medium distance
    },

    // Regular connections without animation
    {
      source: 2,
      target: 3,
      value: 1,
      animated: false,
      force: 200, // Further apart
    },

    // More animated connections
    {
      source: 3,
      target: 4,
      value: 4, // Fastest streaming
      animated: true,
      force: 100,
    },
    {
      source: 4,
      target: 5,
      value: 2,
      animated: true,
      force: 150,
    },

    // Cross connections
    {
      source: 0,
      target: 5,
      value: 1,
      animated: false,
      force: 250,
    },
    {
      source: 1,
      target: 4,
      value: 2,
      animated: true,
      force: 150,
    },
  ],
};
