import ApiService from "./APIService";

class ProductAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async buyProduct(productId: string): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/products/buy`,
        {
          profile_id: productId,
        }
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
