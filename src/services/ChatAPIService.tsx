import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";

class ChatAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getActive(): Promise<any> {
    try {
      const chat = await this.apiService.get("/chats/active");
      return chat;
    } catch (error) {
      throw error;
    }
  }

  async listChats(): Promise<{ data: any[] }> {
    try {
      const chats = await this.apiService.get("/chats");
      return chats as { data: any[] };
    } catch (error) {
      throw error;
    }
  }

  async startChat(data: any): Promise<any> {
    try {
      const chat = await this.apiService.post("/chats", data);
      return chat;
    } catch (error) {
      throw error;
    }
  }
}

export default ChatAPIService;
