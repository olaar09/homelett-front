import { IProduct } from "@/app/interfaces/IProduct";
import ApiService from "./APIService";

class TransactionAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  /*   async buyProduct(data: {
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
  } */

  async fetchTransaction(): Promise<IProduct[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(
        `/transactions/list`
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }
}

export default TransactionAPIService;
