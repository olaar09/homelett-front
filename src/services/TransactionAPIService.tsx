import { IBank, IProduct, ITransaction, ITransferPaymentInfo } from "@/app/interfaces/IProduct";
import ApiService from "./APIService";

class TransactionAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  /*   async buyProduct(data: {
    product_id: string;
    interval: string;
    selected_platforms: string[];
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/products/buy_stream`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  } */

  async generateGroupPayment(amount: number): Promise<ITransferPaymentInfo | null> {
    try {
      const text = await this.apiService.post<{
        data: any;
      }>(`/transactions/initiate_transfer_payment`, { amount: amount });
      return text.data as ITransferPaymentInfo;
    } catch (error) {
      throw error;
    }
  }

  async fetchBanks(): Promise<IBank[] | null> {
    try {
      const text = await this.apiService.get<{
        data: IBank[];
      }>(`/bank_info/list_banks`);
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchTransaction(): Promise<ITransaction[] | null> {
    try {
      const text = await this.apiService.get<{
        data: { data: ITransaction[] };
      }>(`/transactions/list`);
      return text.data.data;
    } catch (error) {
      throw error;
    }
  }
}

export default TransactionAPIService;
