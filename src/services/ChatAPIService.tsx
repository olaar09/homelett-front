import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";

class ChatAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async askQuestion(data: {
    chat_id: string;
    question: string;
    datasource_id: string;
  }): Promise<{ data: IChatHistoryItem }> {
    try {
      const chat = await this.apiService.put(`/chats/${data.chat_id}`, data);
      return chat as { data: IChatHistoryItem };
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

  async startChat(data: { datasource_id: string }): Promise<any> {
    try {
      const chat = await this.apiService.post("/chats", data);
      return chat;
    } catch (error) {
      throw error;
    }
  }
}

export default ChatAPIService;
