import APIUtil from "./APIUtil"
import type { IHousePayment } from "@/app/interfaces/IHousePayment"
import ApiService from "./APIService"

export class HousePaymentService {

    private api: ApiService;

    constructor(apiService: ApiService) {
         this.api = apiService;
    }

    async getHousePayments(): Promise<IHousePayment[]> {

        try {
            const response = await this.api.get<{ data: IHousePayment[] }>('/house-payments')
            return response.data;
          } catch (error) {
            throw error;
          }
    }

    async getHousePaymentById(id: string): Promise<IHousePayment> {
        try {
            const response = await this.api.get<{ data: IHousePayment }>(`/house_payments/${id}`)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

/*     async createHousePayment(data: Partial<IHousePayment>): Promise<IHousePayment> {
        try {
            const response = await this.api.post<{ data: IHousePayment }>('/house_payments', data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateHousePayment(id: string, data: Partial<IHousePayment>): Promise<IHousePayment> {
        try {
            const response = await this.api.put<{ data: IHousePayment }>(`/house_payments/${id}`, data)
            return response.data;
        } catch (error) {
            throw error;
        }
    } */
} 