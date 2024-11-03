// stores/graphStore.ts
import { create } from "zustand";
import type { TemporalNode, TemporalLink } from "@/app/(platform)/(main)/data";

interface GraphStoreState {
  // Graph visibility controls
  goesTrue: boolean;
  setGoesTrue: () => void;
  hideArticles: boolean;
  toggleHideArticles: () => void;

  // Node visibility management
  hiddenNodes: Set<number>;
  hideNode: (nodeId: number) => void;
  showNode: (nodeId: number) => void;
  resetVisibility: () => void;

  // Current state tracking
  visibleNodes: TemporalNode[];
  setVisibleNodes: (nodes: TemporalNode[]) => void;
  currentLinks: TemporalLink[];
  setCurrentLinks: (links: TemporalLink[]) => void;

  // Timeline controls
  sliderPosition: number;
  setSliderPosition: (position: number) => void;
  currentDate: string;
  setCurrentDate: (date: string) => void;

  // Animation controls
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
}

const useGraphStore = create<GraphStoreState>((set, get) => ({
  // Graph visibility controls
  goesTrue: false,
  setGoesTrue: () => set({ goesTrue: true }),
  hideArticles: false,
  toggleHideArticles: () =>
    set((state) => ({
      hideArticles: !state.hideArticles,
    })),

  // Node visibility management
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

  // Current state tracking
  visibleNodes: [],
  setVisibleNodes: (nodes: TemporalNode[]) => {
    const currentNodes = get().visibleNodes;
    if (JSON.stringify(nodes) !== JSON.stringify(currentNodes)) {
      set({ visibleNodes: nodes });
    }
  },
  currentLinks: [],
  setCurrentLinks: (links: TemporalLink[]) => {
    const currentLinks = get().currentLinks;
    if (JSON.stringify(links) !== JSON.stringify(currentLinks)) {
      set({ currentLinks: links });
    }
  },

  // Timeline controls
  sliderPosition: 0,
  setSliderPosition: (position: number) => set({ sliderPosition: position }),
  currentDate: "2024-01-01",
  setCurrentDate: (date: string) => set({ currentDate: date }),

  // Animation controls
  isAnimating: false,
  setIsAnimating: (isAnimating: boolean) => set({ isAnimating }),
}));

export default useGraphStore;
