export interface IHouseIssue {
    id: string
    title: string
    description: string
    image_url?: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    resolution?: string
    landlord_deductable: number
    user_deductable: number
    status: 'pending' | 'in_progress' | 'resolved' | 'cancelled'
    created_at: string
} 