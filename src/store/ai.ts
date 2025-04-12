import { FunctionComponent } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { SvgBag, SvgBrain, SvgSoundVive } from "@/assets/svg";

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

export type CoachType = "GLN" | "SYC";

interface CoachInfo {
  name: string;
  age: number;
  spec: {
    Icon: FunctionComponent<React.SVGProps<SVGSVGElement>>;
    value: string;
  }[];
}

export const AI_INFO: Record<CoachType, CoachInfo> = {
  GLN: {
    name: "금리나",
    age: 34,
    spec: [
      {
        Icon: SvgBag,
        value: "토마토저축은행 10년 근속",
      },
      {
        Icon: SvgBrain,
        value: "이성적·분석적·현실적",
      },
      {
        Icon: SvgSoundVive,
        value: "따뜻하고 차분한 말투·쉬운 설명",
      },
    ],
  },
  SYC: {
    name: "신용철",
    age: 30,
    spec: [
      {
        Icon: SvgBag,
        value: "금융데이터 분석 전문가 찐친",
      },
      {
        Icon: SvgBrain,
        value: "분석적·전략적·핵심적",
      },
      {
        Icon: SvgSoundVive,
        value: "친근하고 유쾌한 말투·쉬운 설명",
      },
    ],
  },
};

interface AiStore {
  selectedAiStyle: Set<AiStyle>;
  selectedCoach?: CoachType;
  setAiStyle: (style: AiStyle) => void;
  setSelectedCoach: (coach: CoachType) => void;
}

export const useAiStore = create<AiStore>()(
  immer((set, get) => ({
    selectedAiStyle: new Set<AiStyle>(),
    selectedCoach: undefined,
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
    setSelectedCoach: (coach) => {
      set((state) => {
        state.selectedCoach = coach;
      });
    },
  })),
);
