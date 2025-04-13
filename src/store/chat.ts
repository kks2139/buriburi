import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { CoachType } from "./ai";

export type Speaker = "AI" | "USER";

interface MessageInfo {
  id: number;
  speaker: Speaker;
  message: string;
  suggestions?: { title: string; subTitle?: string }[];
}

interface ChatStore {
  messages: MessageInfo[];
  actions: {
    addMessage: (info: Omit<MessageInfo, "id">) => void;
    initMessage: (coach?: CoachType) => void;
  };
}

export const useChatStore = create<ChatStore>()(
  immer((set) => ({
    messages: [],
    actions: {
      addMessage: (info) => {
        set((state) => {
          state.messages.push({ ...info, id: Date.now() });
        });
      },
      initMessage: (coach) => {
        const isType1 = coach === "GLN";

        set((state) => {
          state.messages = [
            {
              id: Date.now(),
              speaker: "AI",
              message: isType1
                ? "친절한 대출 전문 상담가 금리나예요☺️ 지금 대출을 알아보시게 된 이유가 어떻게 되실까요?"
                : "판단 빠른 대출 데이터 분석가 신용철 등장😎 대출이 왜 필요해?",
              suggestions: [
                {
                  title: "100만원 정도",
                  subTitle: isType1
                    ? "바로 가능한 대출 있나요?"
                    : "바로 가능한 대출 찾아줘",
                },
                {
                  title: "전세보증금 플랜",
                  subTitle: isType1
                    ? "내 상황에 맞게 분석하고 알려주세요"
                    : "내 상황에 맞게 분석하고 알려줘",
                },
              ],
            },
          ];
        });
      },
    },
  })),
);
