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
    interval_minutes: any;
    interval: string;
    title: string;
    output_connection: any;
    chat_history_item_id: any;
  }): Promise<any> {
    try {
      await this.apiService.post(`/workflows`, data);
    } catch (error) {
      throw error;
    }
  }

  async getWorkflows(): Promise<{ data: any[] }> {
    try {
      const response = await this.apiService.get(`/workflows`);
      return response as { data: any[] };
    } catch (error) {
      throw error;
    }
  }

  async deleteWorkflow(id: any): Promise<{ data: any[] }> {
    try {
      const response = await this.apiService.delete(`/workflows/${id}`, {});
      return response as { data: any[] };
    } catch (error) {
      throw error;
    }
  }
}

export default WorkflowAPIService;
