import { useState, useEffect } from 'react'
import { HousePaymentService } from '@/services/HousePaymentService'
import type { IHousePayment } from '@/app/interfaces/IHousePayment'
import APIUtil from '@/services/APIUtil'
export function useHousePayments() {
    const [payments, setPayments] = useState<IHousePayment[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const api = new APIUtil()

    const fetchPayments = async () => {
        try {
            setIsLoading(true)
            setError(null)

            // Add 300 second delay
           // await new Promise(resolve => setTimeout(resolve, 3000))
            
            const data = await api.housePaymentService.getHousePayments()
            setPayments(data)
        } catch (err) {
            setError('Failed to fetch payments. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPayments()
    }, [])

    return {
        payments,
        isLoading,
        error,
        retry: fetchPayments
    }
} 