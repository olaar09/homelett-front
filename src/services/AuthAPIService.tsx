import { INewSubject } from "@/app/interfaces/INewSubject";
import ApiService from "./APIService";
import { ISubjectItem } from "@/app/interfaces/ISubjectItem";
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest";

class AuthAPIService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async googleSignIn(idToken: string): Promise<void> {
    try {
      await this.apiService.post("/api/auth/google", {
        id_token: idToken,
      });
    } catch (error) {
      throw new Error(`Failed to sign in with google: ${error}`);
    }
  }

  async register(data: IAuthRequest): Promise<void> {
    try {
      await this.apiService.post("/auth/register", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      throw new Error(`Failed to register: ${error}`);
    }
  }

  async login(data: IAuthRequest): Promise<void> {
    try {
      await this.apiService.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      throw new Error(`Failed to register: ${error}`);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.apiService.get("/auth/logout");
    } catch (error) {
      throw new Error(`Failed to logout: ${error}`);
    }
  }
}

export default AuthAPIService;
