import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";

class WorkflowAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async createWorkflow(data: {
    datasourceId: string;
    config: any;
    title: string;
    description: string;
    payload: any;
  }): Promise<any> {
    try {
      await this.apiService.post(`/workflows`, data);
    } catch (error) {
      throw error;
    }
  }

  async getWorkflows(): Promise<any[]> {
    try {
      const response = await this.apiService.get(`/workflows`);
      return response as any[];
    } catch (error) {
      throw error;
    }
  }
}

export default WorkflowAPIService;
