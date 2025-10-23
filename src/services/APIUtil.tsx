// Import the necessary services
import APIService from "./APIService";
import ContractAPIService from "./ContractAPIService";
import { Str } from "@/utils/consts";

class APIUtil {
  public contractService: ContractAPIService;

  constructor() {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = isProduction
      ? Str.baseUrlProd
      : Str.baseUrlDev;

    const service = new APIService(baseUrl); // Initialize ApiService
    this.contractService = new ContractAPIService(service);
  }
}

export default APIUtil;