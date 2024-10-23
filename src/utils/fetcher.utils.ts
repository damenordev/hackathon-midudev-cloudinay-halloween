export interface IFetcherOptions extends Omit<RequestInit, 'body'> {
  data: Record<string, any>
}

export const fetcher = async <T>(url: string, options: IFetcherOptions) => {
  const body = new FormData()
  Object.keys(options.data).forEach(key => body.append(key, options.data[key]))

  const headers = {
    Authorization: `Bearer ${import.meta.env.API_KEY}`,
    ...options.headers,
  }
  const response = await fetch(url, { ...options, headers, body })

  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`)
  return (await response.json()) as Promise<T>
}
