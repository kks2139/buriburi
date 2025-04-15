import { useCallback, useState } from "react";

import { CoachType } from "@/store";
import { fetchData, FetchOptions } from "@/utils";

export type ApiKey =
  | "healthCheck"
  | "selectCounselor"
  | "loanNeedsAnalyzation"
  | "fetchFinanceAsset"
  | "inquryInterestRateLimit"
  | "summaryInquiryResult"
  | "continueFromLast"
  | "jeonsePlanning";

export type LoanNeedsAnalyzationStatus =
  | "ANALYZE_LOAN_NEEDS"
  | "READY_TO_FETCH_FINANCE_ASSET"
  | "READY_TO_INQUIRY_LOAN"
  | "CONTINUE_FROM_LAST_STATUS"
  | "LOAN_INQUIRY_COMPLETED"
  | "JEONSE_INQUIRY_COMPLETED";

export type SuggestionActionType =
  | "VIEW_INQUIRY_RESULT"
  | "RESULT_SUMMARY"
  | "READY_TO_INQUIRY"
  | "CONTINUE_FROM_LAST"
  | "RESET_QUESTION"
  | "READY_TO_FETCH_ASSET"
  | "ENTRY_1"
  | "ENTRY_2"
  | "VIEW_ANOTHER_JEONSE";

export interface SuggestionBubble {
  actionType?: SuggestionActionType;
  titleMessage: string;
  subMessage: string;
}

export interface LoanNeedsAnalyzationResponse {
  outputBody: string;
  status: LoanNeedsAnalyzationStatus;
  errorMessage?: string;
  suggestions?: SuggestionBubble[];
}

export interface LoanNeedsAnalyzationRequest {
  sessionId: string;
  message: string;
  counselorType: CoachType;
  status: LoanNeedsAnalyzationStatus;
}

export let sessionId = Date.now();

export const updateSessionId = () => ++sessionId;

const BASE_URL = "https://l7c7jw2f9h.execute-api.us-east-1.amazonaws.com";

export const apiInfo: Record<ApiKey, Pick<FetchOptions, "url" | "method">> = {
  healthCheck: {
    url: `${BASE_URL}/health-check`,
    method: "GET",
  },
  selectCounselor: {
    url: `${BASE_URL}/select-counselor`,
    method: "POST",
  },
  loanNeedsAnalyzation: {
    url: `${BASE_URL}/loan-needs-analyzation`,
    method: "POST",
  },
  fetchFinanceAsset: {
    url: `${BASE_URL}/fetch-finance-asset`,
    method: "POST",
  },
  inquryInterestRateLimit: {
    url: `${BASE_URL}/inquiry-interest-rate-limit`,
    method: "POST",
  },
  summaryInquiryResult: {
    url: `${BASE_URL}/summary-inquiry-result`,
    method: "POST",
  },
  continueFromLast: {
    url: `${BASE_URL}/continue-from-last`,
    method: "GET",
  },
  jeonsePlanning: {
    url: `${BASE_URL}/jeonse-planning`,
    method: "POST",
  },
};

interface Options {
  skipErrorMessage?: boolean;
}

export const useFetch = ({ skipErrorMessage }: Options = {}) => {
  const [isFetching, setIsFetching] = useState(false);

  const request = useCallback(
    async <TResult, TData = Record<string, unknown>>(
      apiKey: ApiKey,
      data?: TData,
    ) => {
      setIsFetching(true);

      const result = await fetchData<TResult, TData>({
        url: apiInfo[apiKey].url,
        method: apiInfo[apiKey].method,
        data,
        skipErrorMessage,
      });

      setIsFetching(false);

      return result;
    },
    [skipErrorMessage],
  );

  return {
    isFetching,
    request,
  };
};
