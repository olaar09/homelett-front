import { IProduct } from "@/app/interfaces/IProduct";
import ApiService from "./APIService";
import { ICredential } from "@/app/interfaces/IRegisterRequest";

class ProductAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async fetchAllAvailableCredentialList(): Promise<ICredential[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(
        `/credential_demand/available_credentials_list`
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchAllPlatformSubscriptions(
    platformId: string
  ): Promise<any[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(
        `/credentials_request/platform_subs/${platformId}`
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }
  async fetchExpiredCredential(): Promise<ICredential[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(
        `/credentials_request/expired`
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchAllCredentialRequests(
    type: string
  ): Promise<ICredential[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(
        `/credentials_request/all?type=${type}`
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchShareCredentials(): Promise<ICredential[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(
        `/credentials_request`
      );
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async revokeCredential(data: { credential_id: string }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/credentials_request/revoke`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async rejectCredential(data: { credential_id: string }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/credentials_request/reject`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateCredentialPassword(data: {
    credential_request_id: string;
    password: string;
    invite_link: string;
    email: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.put<{ data: any }>(
        `/credentials_request/update_credential_password`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async acceptCredential(data: {
    credential_id: string;
    next_billing: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/credentials_request/accept`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateCredential(data: {
    platform_id: string;
    email: string;
    password?: string;
    credential_request_id: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.put<{ data: any }>(
        `/credentials_request`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async shareCredential(data: {
    platform_id: string;
    email: string;
    password?: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/credentials_request`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async buyAirtimeProduct(data: {
    product_id: string;
    phone: string;
    amount?: string;
    data_plan?: string | null;
    type: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/products/${data.type === "data" ? "buy_airtime_data" : "buy_airtime"
        }`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async buyResellerProduct(data: {
    product_id: string;
    customer_email: string;
    interval: string
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/products/buy_reseller`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async buySingleProduct(data: {
    product_id: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/products/buy_single`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async buyProduct(data: {
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
  }

  async fetchProducts(): Promise<IProduct[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(`/products`);
      return text.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchDataPlanProducts(): Promise<IProduct[] | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(`/products/data`);
      return text.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductAPIService;
