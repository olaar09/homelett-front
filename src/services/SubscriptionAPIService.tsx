import { IProduct } from "@/app/interfaces/IProduct";
import ApiService from "./APIService";

class SubscriptionAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getSubscriptions(): Promise<IProduct[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(`/subscriptions`);
      return text.data;
    } catch (error) {
      throw error;
    }
  }
}

export default SubscriptionAPIService;
