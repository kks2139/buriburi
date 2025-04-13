export type Method = "GET" | "POST";

export interface FetchOptions<T = Record<string, unknown>> {
  url: string;
  method: Method;
  data?: T;
  params?: string;
  skipErrorMessage?: boolean;
}

const handleError = (skipErrorMessage?: boolean) => {
  if (!skipErrorMessage) {
    alert("문제가 발생하였습니다.\n다시 시도해주세요!");
  }
};

export const fetchData = async <TResult, TData = Record<string, unknown>>({
  url,
  method,
  data,
  params,
  skipErrorMessage,
}: FetchOptions<TData>) => {
  const requestUrl = `${url}${params ? `?${params}` : ""}`;

  try {
    const res = await fetch(requestUrl, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, nostore, max-age=0, must-revalidate",
      },
      method,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (res.ok) {
      return (await res.json()) as TResult;
    } else {
      handleError(skipErrorMessage);
    }
  } catch {
    handleError(skipErrorMessage);
  }
};
