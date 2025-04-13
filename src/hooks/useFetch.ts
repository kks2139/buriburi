import { useCallback, useState } from "react";

import { fetchData, FetchOptions } from "@/utils";

type ApiKey = "queryAi" | "healthCheck";

const apiInfo: Record<ApiKey, Pick<FetchOptions, "url" | "method">> = {
  queryAi: {
    url: "",
    method: "POST",
  },
  healthCheck: {
    url: "https://l7c7jw2f9h.execute-api.us-east-1.amazonaws.com/health-check",
    method: "GET",
  },
};

interface Options {
  skipErrorMessage?: boolean;
}

export const useFetch = ({ skipErrorMessage }: Options = {}) => {
  const [isFetching, setIsFetching] = useState(false);

  const request = useCallback(
    async <T>(apiKey: ApiKey) => {
      setIsFetching(true);

      const result = await fetchData<T>({
        url: apiInfo[apiKey].url,
        method: apiInfo[apiKey].method,
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
