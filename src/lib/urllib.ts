export const createRequestParams = (query: Partial<{ [key: string]: string | string[] }>) =>
  new URLSearchParams(query as Record<string, string>).toString();
