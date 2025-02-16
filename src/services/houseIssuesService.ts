import { HouseIssue } from '@/app/interfaces/houseIssue'
import APIUtil from './APIUtil'
import APIService from './APIService'
import { IHouseIssue } from '@/app/interfaces/IHouseIssue'


export class HouseIssuesService {
    private api: APIService;
    constructor(apiService: APIService) {
        this.api = apiService;
    }

    async getHouseIssues(): Promise<any> {
        const response = await this.api.get<{ data: IHouseIssue[] }>('/house-issues')
        return response.data
    }

    async createHouseIssue(issue: Omit<HouseIssue, 'id'>): Promise<any> {
        const response = await this.api.post<{ data: HouseIssue }>('/house-issues', issue)
        return response.data
    }

    async updateHouseIssue(id: string, issue: Partial<HouseIssue>): Promise<any> {
        const response = await this.api.put<{ data: HouseIssue }>(`/house-issues/${id}`, issue)
        return response.data
    }

    async deleteHouseIssue(id: string): Promise<any> {  
        return await this.api.delete<any>(`/house-issues/${id}`, {})
    }
}

