import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import firebase from "firebase/compat/app";
import "firebase/auth";

type RequestOptions = {
  method: "GET" | "POST" | "PUT" | "HEAD" | "DELETE";
  data?: any;
};

class APIService {
  private apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions
  ): Promise<T> {
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"));
    const url = `${this.apiBaseUrl}${endpoint}`;
    try {

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Automatically handle Content-Type for FormData
      if ((options.data instanceof FormData)) {
        headers["Content-Type"] = "multipart/form-data";
      }



      const axiosOptions: AxiosRequestConfig = {
        url: url,
        method: options.method,
        headers: headers,
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

  public async postFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    return await this.request<T>(endpoint, {
      method: "POST",
      data: formData,
    });
  }

  public async post<T>(endpoint: string, data: Object): Promise<T> {
    return await this.request<T>(endpoint, {
      method: "POST",
      data: data,
    });
  }

  public async delete<T>(endpoint: string, data: Object): Promise<T> {
    return await this.request<T>(endpoint, {
      method: "DELETE",
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
