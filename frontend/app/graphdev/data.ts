// types.ts
export interface Node {
  id: number;
  name: string;
  value: number;
}

export interface Link {
  source: number;
  target: number;
  value: number;
}

export const graphData = {
  nodes: [
    { id: 1, name: "Node 1", value: 20 },
    { id: 2, name: "Node 2", value: 15 },
    { id: 3, name: "Node 3", value: 25 },
    { id: 4, name: "Node 4", value: 18 },
    { id: 5, name: "Node 5", value: 22 },
    { id: 6, name: "Node 6", value: 30 },
    { id: 7, name: "Node 7", value: 28 },
    { id: 8, name: "Node 8", value: 12 },
    { id: 9, name: "Node 9", value: 24 },
    { id: 10, name: "Node 10", value: 16 },
  ],
  links: [
    { source: 0, target: 1, value: 1 },
    { source: 0, target: 2, value: 1 },
    { source: 1, target: 3, value: 1 },
    { source: 2, target: 4, value: 1 },
    { source: 3, target: 5, value: 1 },
    { source: 5, target: 6, value: 1 },
    { source: 6, target: 7, value: 1 },
    { source: 7, target: 8, value: 1 },
    { source: 8, target: 9, value: 1 },
    { source: 1, target: 6, value: 1 },
    { source: 2, target: 7, value: 1 },
    { source: 3, target: 8, value: 1 },
  ],
};
