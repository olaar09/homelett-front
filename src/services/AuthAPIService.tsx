import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { ISubjectItem } from "@/app/interfaces/IChatItem";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";

class AuthAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async googleSignIn(idToken: string): Promise<{ data: IAuth }> {
    try {
      return await this.apiService.post("/auth/google", {
        id_token: idToken,
      });
    } catch (error) {
      throw error;
    }
  }

  async register(data: IAuthRequest): Promise<{ data: IAuth }> {
    try {
      return await this.apiService.post("/auth/register", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      throw error;
    }
  }

  async login(data: IAuthRequest): Promise<{ data: IAuth }> {
    try {
      return await this.apiService.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.apiService.get("/auth/logout");
    } catch (error) {
      throw error;
    }
  }
}

export default AuthAPIService;
