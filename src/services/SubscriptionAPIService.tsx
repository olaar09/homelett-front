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

  async resetSubscription(data: { subscription_id: string }): Promise<any> {
    try {
      const text = await this.apiService.post<{ data: any }>(
        `/subscriptions/reset`,
        data
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async renewSubscription(data: { subscription_id: string }): Promise<any> {
    try {
      const text = await this.apiService.post<{ data: any }>(
        `/subscriptions/renew`,
        data
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async requestSubscriptionCredential(data: {
    subscription_id: string;
    selected_platform: string;
  }): Promise<any> {
    try {
      const text = await this.apiService.post<{ data: any }>(
        `/subscriptions/request_credential`,
        data
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }
}

export default SubscriptionAPIService;
