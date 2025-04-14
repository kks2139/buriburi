import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  apiInfo,
  ApiKey,
  LoanNeedsAnalyzationRequest,
  LoanNeedsAnalyzationResponse,
  LoanNeedsAnalyzationStatus,
  sessionId,
  SuggestionBubble,
} from "@/hooks";
import { fetchData } from "@/utils";

import { CoachType } from "./ai";

export type Speaker = "AI" | "USER";

interface MessageInfo {
  id: number;
  speaker: Speaker;
  message: string;
  suggestions?: SuggestionBubble[];
}

interface ChatStore {
  messages: MessageInfo[];
  inputTextValue: string;
  isQuerying: boolean;
  isFinanceAssetLoading: boolean;
  isInquiryInterestRateLimitLoading: boolean;
  loanNeedsAnalyzationStatus: LoanNeedsAnalyzationStatus;
  actions: {
    initMessage: (coach?: CoachType) => void;
    addMessage: (info: Omit<MessageInfo, "id">) => void;
    removeLastMessage: () => void;
    setInputTextValue: (value: string) => void;
    setIsQuerying: (value: boolean) => void;
    setIsFinanceAssetLoading: (value: boolean) => void;
    setIsInquiryInterestRateLimitLoading: (value: boolean) => void;
    setLoanNeedsAnalyzationStatus: (value: LoanNeedsAnalyzationStatus) => void;
    queryToAi: (
      message: string,
      coach: CoachType,
      apiKey?: ApiKey,
    ) => Promise<void>;
  };
}

export const useChatStore = create<ChatStore>()(
  immer((set, get) => ({
    messages: [],
    inputTextValue: "",
    isQuerying: false,
    isFinanceAssetLoading: false,
    isInquiryInterestRateLimitLoading: false,
    loanNeedsAnalyzationStatus: "ANALYZE_LOAN_NEEDS",
    actions: {
      initMessage: (coach) => {
        const isType1 = coach === "LINA";

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
                  titleMessage: "100만원 정도",
                  subMessage: isType1
                    ? "바로 가능한 대출 있나요?"
                    : "바로 가능한 대출 찾아줘",
                },
                {
                  titleMessage: "전세보증금 플랜",
                  subMessage: isType1
                    ? "내 상황에 맞게 분석하고 알려주세요"
                    : "내 상황에 맞게 분석하고 알려줘",
                },
              ],
            },
          ];
        });
      },
      addMessage: (info) => {
        set((state) => {
          state.messages.push({ ...info, id: Date.now() });
        });
      },
      removeLastMessage: () => {
        set((state) => {
          state.messages.pop();
        });
      },
      setInputTextValue: (value: string) => {
        set((state) => {
          state.inputTextValue = value;
        });
      },
      setIsQuerying: (value) => {
        set((state) => {
          state.isQuerying = value;
        });
      },
      setIsFinanceAssetLoading: (value) => {
        set((state) => {
          state.isFinanceAssetLoading = value;
        });
      },
      setIsInquiryInterestRateLimitLoading: (value) => {
        set((state) => {
          state.isInquiryInterestRateLimitLoading = value;
        });
      },
      setLoanNeedsAnalyzationStatus: (value) => {
        set((state) => {
          state.loanNeedsAnalyzationStatus = value;
        });
      },
      queryToAi: async (message, coach, apiKey = "loanNeedsAnalyzation") => {
        const {
          loanNeedsAnalyzationStatus,
          actions: { setIsQuerying, addMessage, setLoanNeedsAnalyzationStatus },
        } = get();

        setIsQuerying(true);

        const result = await fetchData<
          LoanNeedsAnalyzationResponse,
          LoanNeedsAnalyzationRequest
        >({
          url: apiInfo[apiKey].url,
          method: apiInfo[apiKey].method,
          data: {
            sessionId: `session-${sessionId}`,
            message,
            counselorType: coach,
            status: loanNeedsAnalyzationStatus,
          },
          skipErrorMessage: true,
        });

        setIsQuerying(false);

        const errorMsg = "죄송해요 다시 질문해주세요!";

        if (result) {
          addMessage({
            speaker: "AI",
            message: result.errorMessage ? errorMsg : result.outputBody,
            suggestions: result.suggestions,
          });

          setLoanNeedsAnalyzationStatus(result.status || "ANALYZE_LOAN_NEEDS");
        } else {
          addMessage({
            speaker: "AI",
            message: errorMsg,
          });
        }
      },
    },
  })),
);
