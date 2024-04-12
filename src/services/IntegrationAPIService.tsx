import ApiService from "./APIService";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";

class IntegrationAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async updateOpenAIKey(token: string): Promise<any> {
    try {
      return await this.apiService.put("/integrations/openai", {
        key: token,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default IntegrationAPIService;
