// stores/graphStore.ts
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
  resetVisibility: () => void;
  visibleNodes: TemporalNode[];
  setVisibleNodes: (nodes: TemporalNode[]) => void;
  sliderPosition: number;
  setSliderPosition: (position: number) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
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
  resetVisibility: () =>
    set({
      hiddenNodes: new Set(),
      hideArticles: false,
    }),
  visibleNodes: [],
  setVisibleNodes: (nodes: TemporalNode[]) => {
    const currentNodes = get().visibleNodes;
    if (JSON.stringify(nodes) !== JSON.stringify(currentNodes)) {
      set({ visibleNodes: nodes });
    }
  },
  sliderPosition: 0,
  setSliderPosition: (position: number) => set({ sliderPosition: position }),
  isAnimating: false,
  setIsAnimating: (isAnimating: boolean) => set({ isAnimating: isAnimating }),
}));

export default useGraphStore;
