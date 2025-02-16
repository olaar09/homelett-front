export interface IHousePayment {
    id: string
    title: string
    description: string
    amount: number
    interval: 'single' | 'monthly' | 'weekly'
    created_at: string
    status: 'pending' | 'completed' | 'failed'
} 