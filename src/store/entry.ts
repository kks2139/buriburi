import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type AiStyle =
  | "정중한"
  | "친근한"
  | "차분한"
  | "유쾌한"
  | "핵심만"
  | "공감형"
  | "이성적인"
  | "따뜻한"
  | "전문가"
  | "경험자";

export const AI_STYLES: AiStyle[] = [
  "정중한",
  "친근한",
  "차분한",
  "유쾌한",
  "핵심만",
  "공감형",
  "이성적인",
  "따뜻한",
  "전문가",
  "경험자",
];

interface EntryStore {
  selectedAiStyle: Set<AiStyle>;
  setAiStyle: (style: AiStyle) => void;
}

export const useEntryStore = create<EntryStore>()(
  immer((set, get) => ({
    selectedAiStyle: new Set<AiStyle>(),
    setAiStyle: (style) => {
      const { selectedAiStyle } = get();

      set((state) => {
        if (selectedAiStyle.has(style)) {
          state.selectedAiStyle.delete(style);
        } else {
          state.selectedAiStyle.add(style);
        }
      });
    },
  })),
);
