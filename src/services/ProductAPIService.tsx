import { IProduct } from "@/app/interfaces/IProduct";
import ApiService from "./APIService";
import { ICredential } from "@/app/interfaces/IRegisterRequest";

class ProductAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async fetchShareCredentials(): Promise<ICredential[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(
        `/shared_credentials`
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async shareCredential(data: {
    platform_id: string;
    email: string;
    password?: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/shared_credentials`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async buyAirtimeProduct(data: {
    product_id: string;
    phone: string;
    amount?: string;
    data_plan?: string | null;
    type: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/products/${
          data.type === "data" ? "buy_airtime_data" : "buy_airtime"
        }`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async buyProduct(data: {
    product_id: string;
    interval: string;
    selected_platforms: string[];
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/products/buy_stream`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchProducts(): Promise<IProduct[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(`/products`);
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchDataPlanProducts(): Promise<IProduct[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(`/products/data`);
      return text.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductAPIService;
