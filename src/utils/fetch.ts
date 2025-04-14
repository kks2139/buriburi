import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

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
      body: data
        ? JSON.stringify(snakecaseKeys(data, { deep: true }))
        : undefined,
    });

    if (res.ok) {
      const result = await res.json();

      return camelcaseKeys(result, { deep: true }) as TResult;
    } else {
      handleError(skipErrorMessage);
    }
  } catch (e) {
    console.log(e);

    handleError(skipErrorMessage);
  }
};
