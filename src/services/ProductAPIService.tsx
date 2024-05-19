import ApiService from "./APIService";

class ProductAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async buyProduct(data: {
    product_id: string;
    interval: string;
  }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/products/buy`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchProducts(): Promise<IJobProfileFeature | null> {
    try {
      const text = await this.apiService.get<{ data: any }>(`/products`);
      return text.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductAPIService;
