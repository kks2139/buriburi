import { useCallback, useState } from "react";

import { fetchData, FetchOptions } from "@/utils";

type ApiKey = "healthCheck" | "loanNeedsAnalyzation" | "selectCounselor";

const BASE_URL = "https://l7c7jw2f9h.execute-api.us-east-1.amazonaws.com";

const apiInfo: Record<ApiKey, Pick<FetchOptions, "url" | "method">> = {
  healthCheck: {
    url: `${BASE_URL}/health-check`,
    method: "GET",
  },
  loanNeedsAnalyzation: {
    url: `${BASE_URL}/loan-needs-analyzation`,
    method: "POST",
  },
  selectCounselor: {
    url: `${BASE_URL}/select-counselor`,
    method: "POST",
  },
};

// body:
// types -> string[]

// res:
// type
// name

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
