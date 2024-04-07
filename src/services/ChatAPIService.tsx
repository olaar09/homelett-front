import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";

class ChatAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async listChats(): Promise<any[]> {
    try {
      const chats = await this.apiService.get("/chats");
      return chats as any[];
    } catch (error) {
      throw error;
    }
  }

  async startChat(data: any): Promise<any> {
    try {
      const chat = await this.apiService.post("/chats", {});
      return chat;
    } catch (error) {
      throw error;
    }
  }
}

export default ChatAPIService;
