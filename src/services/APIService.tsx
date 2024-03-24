import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import firebase from "firebase/compat/app";
import "firebase/auth";

type RequestOptions = {
  method: "GET" | "POST" | "PUT" | "HEAD";
  data?: any;
};

class APIService {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  private async getIdToken(): Promise<string> {
    const user = firebase.auth().currentUser;
    if (!user) return "";
    return user.getIdToken();
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions
  ): Promise<T> {
    const url = `${this.apiBaseUrl}${endpoint}`;
    try {
      const idToken = await this.getIdToken();

      const axiosOptions: AxiosRequestConfig = {
        url: url,
        method: options.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `${idToken}`,
        },
        data: options.data,
      };

      if (options.method === "HEAD") {
        const response: AxiosResponse = await axios.head(url, axiosOptions);
        return response.headers as unknown as T;
      }

      const response: AxiosResponse = await axios(axiosOptions);
      return response.data as T;
    } catch (error) {
      console.error(`${options.method} request error: `, error);
      throw error;
    }
  }

  public get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  public async post<T>(endpoint: string, data: Object): Promise<T> {
    return await this.request<T>(endpoint, {
      method: "POST",
      data: data,
    });
  }

  public put<T>(endpoint: string, data: Object): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      data: data,
    });
  }

  public head<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "HEAD" });
  }
}

export default APIService;
