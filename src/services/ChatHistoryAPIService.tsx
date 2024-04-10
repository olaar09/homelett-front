import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";
import { IChatHistoryItem } from "@/app/interfaces/IChatHistoryItem";

class ChatHistoryAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getChatHistory(chatId: string): Promise<{ data: IChatHistoryItem[] }> {
    try {
      const user = await this.apiService.get(`/chats/${chatId}/history`);
      return user as { data: IChatHistoryItem[] };
    } catch (error) {
      throw error;
    }
  }

  async updateChatHistory(
    chatId: string,
    config: { key: string; value: string }
  ): Promise<string> {
    try {
      const response = await this.apiService.put(`/chats/${chatId}/history`, {
        chat_history_id: chatId,
        ...config,
      });
      return response as string;
    } catch (error) {
      throw error;
    }
  }
}

export default ChatHistoryAPIService;
