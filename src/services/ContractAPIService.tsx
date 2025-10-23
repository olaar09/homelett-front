import APIService from "./APIService";
import { ContractData, ContractResponse } from "@/interfaces";

class ContractAPIService {
    private apiService: APIService;

    constructor(apiService: APIService) {
        this.apiService = apiService;
    }

    /**
     * Fetch notice data by puuid
     * @param puuid - The unique identifier for the notice
     * @returns Promise<ContractResponse>
     */
    public async getNotice(puuid: string): Promise<ContractResponse> {
        return await this.apiService.get<ContractResponse>(`/notices/public/${puuid}`);
    }

    /**
     * Fetch agreement data by puuid
     * @param puuid - The unique identifier for the agreement
     * @returns Promise<ContractResponse>
     */
    public async getAgreement(puuid: string): Promise<ContractResponse> {
        return await this.apiService.get<ContractResponse>(`/agreements/public/${puuid}`);
    }
}

export default ContractAPIService;
