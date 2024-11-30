import { IProduct } from "@/app/interfaces/IProduct";
import ApiService from "./APIService";
import { ICredential } from "@/app/interfaces/IRegisterRequest";

class DashboardAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getDashboard(): Promise<any> {
    try {
      const text = await this.apiService.get<{ data: any }>(
        `/dashboard/summary`
      );

      console.log(text);

      return text.data;
    } catch (error) {
      throw error;
    }
  }

}

export default DashboardAPIService;
