export const fetcher =
  (token: string) =>
  (info: RequestInfo, init?: RequestInit<RequestInitCfProperties>) =>
    fetch(info, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bot ${token}`,
      },
    })
