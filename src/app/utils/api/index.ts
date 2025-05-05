export function buildUrl(
  baseUrl: string,
  endpoint: string,
  params?: Record<string, unknown>
): string {
  const url = new URL(endpoint, baseUrl);

  if (params) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "number" || value) {
        searchParams.append(key, String(value));
      }
    }

    url.search = searchParams.toString();
  }

  return url.toString();
}
