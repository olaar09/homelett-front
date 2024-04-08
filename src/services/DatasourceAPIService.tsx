import { IDataSourceItem } from "@/app/interfaces/IDatasourceItem";
import ApiService from "./APIService";

class DataSourceAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async listSourceTypes(): Promise<{ data: IDataSourceItem[] }> {
    try {
      const chats = await this.apiService.get("/datasource/types");
      return chats as { data: IDataSourceItem[] };
    } catch (error) {
      throw error;
    }
  }

  async listSources(): Promise<{ data: { data: IDataSourceItem[] } }> {
    try {
      const chats = await this.apiService.get("/datasource");
      return chats as { data: { data: IDataSourceItem[] } };
    } catch (error) {
      throw error;
    }
  }

  async addSource(data: any): Promise<any> {
    try {
      const chat = await this.apiService.post("/datasource", data);
      return chat;
    } catch (error) {
      throw error;
    }
  }
}

export default DataSourceAPIService;
