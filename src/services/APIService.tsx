// APIService.ts

type RequestOptions = {
  method: "GET" | "POST" | "PUT" | "HEAD";
  headers: HeadersInit;
  body?: string;
};

class APIService {
  private apiBaseUrl: string;
  private headers: HeadersInit;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
    this.headers = {
      "Content-Type": "application/json",
      // Include any other common headers like Authorization
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions
  ): Promise<T> {
    const url = `${this.apiBaseUrl}${endpoint}`;
    try {
      const response = await fetch(url, options);
      if (options.method === "HEAD") {
        // For HEAD requests, we might only be interested in the status or headers
        return response.headers as unknown as T;
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error(`${options.method} request error: `, error);
      throw error;
    }
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET", headers: this.headers });
  }

  public post<T>(endpoint: string, data: Object): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  public put<T>(endpoint: string, data: Object): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(data),
    });
  }

  public head<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "HEAD", headers: this.headers });
  }
}

export default APIService;
