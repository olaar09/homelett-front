import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { IAuthRequest, IHouse } from "@/app/interfaces/IRegisterRequest";

class HouseAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }


  async updateHouse(houseId: number, data: { data: IHouse }): Promise<string> {
    try {
      const response = await this.apiService.put<{ data: any }>(
        `/houses/${houseId}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  async addHouse(data: { data: IHouse }): Promise<string> {
    try {
      const response = await this.apiService.post<{ data: any }>(
        `/houses`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getHouses(): Promise<{ data: IHouse[] }> {
    try {
      const user = await this.apiService.get("/houses");
      return user as { data: IHouse[] };
    } catch (error) {
      throw error;
    }
  }


  async getHouse(houseId: number): Promise<{ data: IHouse }> {
    try {
      const user = await this.apiService.get(`/houses/${houseId}`);
      return user as { data: IHouse };
    } catch (error) {
      throw error;
    }
  }

  async getResidentsByHouse(houseId: number): Promise<{ data: IHouse[] }> {
    try {
      const user = await this.apiService.get(`/houses/${houseId}/residents`);
      return user as { data: IHouse[] };
    } catch (error) {
      throw error;
    }
  }

}

export default HouseAPIService;
