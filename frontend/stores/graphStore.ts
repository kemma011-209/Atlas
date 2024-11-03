// app/(platform)/(main)/_components/store/graph-store.ts
import { create } from "zustand";
import type { TemporalNode } from "@/app/(platform)/(main)/data";
interface GraphStoreState {
  goesTrue: boolean;
  setGoesTrue: () => void;
  hideArticles: boolean;
  toggleHideArticles: () => void;
  hiddenNodes: Set<number>;
  hideNode: (nodeId: number) => void;
  showNode: (nodeId: number) => void;
  visibleNodes: TemporalNode[];
  setVisibleNodes: (nodes: TemporalNode[]) => void;
}

const useGraphStore = create<GraphStoreState>((set, get) => ({
  goesTrue: false,
  setGoesTrue: () => set({ goesTrue: true }),
  hideArticles: false,
  toggleHideArticles: () =>
    set((state) => ({ hideArticles: !state.hideArticles })),
  hiddenNodes: new Set<number>(),
  hideNode: (nodeId: number) =>
    set((state) => {
      const newHiddenNodes = new Set(state.hiddenNodes);
      newHiddenNodes.add(nodeId);
      return { hiddenNodes: newHiddenNodes };
    }),
  showNode: (nodeId: number) =>
    set((state) => {
      const newHiddenNodes = new Set(state.hiddenNodes);
      newHiddenNodes.delete(nodeId);
      return { hiddenNodes: newHiddenNodes };
    }),
  visibleNodes: [],
  setVisibleNodes: (nodes: TemporalNode[]) => {
    const currentNodes = get().visibleNodes;
    // Only update if the nodes have actually changed
    if (JSON.stringify(nodes) !== JSON.stringify(currentNodes)) {
      set({ visibleNodes: nodes });
    }
  },
}));

export default useGraphStore;
