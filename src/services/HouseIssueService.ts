import type { IHouseIssue } from "@/app/interfaces/IHouseIssue"
import ApiService from "./APIService"

export class HouseIssueService {
    private api: ApiService;

    constructor(apiService: ApiService) {
        this.api = apiService;
    }

    async getHouseIssues(): Promise<IHouseIssue[]> {
        try {
            const response = await this.api.get<{ data: IHouseIssue[] }>('/house-issues')
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getHouseIssueById(id: string): Promise<IHouseIssue> {
        try {
            const response = await this.api.get<{ data: IHouseIssue }>(`/house-issues/${id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async createHouseIssue(data: Partial<IHouseIssue>): Promise<IHouseIssue> {
        try {
            const response = await this.api.post<{ data: IHouseIssue }>('/house-issues', data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateHouseIssue(id: string, data: Partial<IHouseIssue>): Promise<IHouseIssue> {
        try {
            const response = await this.api.put<{ data: IHouseIssue }>(`/house-issues/${id}`, data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }
} 