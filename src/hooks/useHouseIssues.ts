import { useState, useEffect } from 'react'
import type { IHouseIssue } from '@/app/interfaces/IHouseIssue'
import APIUtil from '@/services/APIUtil'

export function useHouseIssues() {
    const [issues, setIssues] = useState<IHouseIssue[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const apiUtil = new APIUtil()



    const fetchIssues = async () => {
        try {
            setIsLoading(true)
            setError(null)
            console.log(apiUtil);
            
            // Add 300 second delay
            const data = await apiUtil.houseIssueService.getHouseIssues()
            setIssues(data)
        } catch (err) {
            console.log(err);
            setError('Failed to fetch issues. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const createIssue = async (data: Partial<IHouseIssue>) => {
        try {
            setIsLoading(true)
            setError(null)
            await apiUtil.houseIssueService.createHouseIssue(data)
            await fetchIssues() // Refresh the list after creating
        } catch (err) {
            setError('Failed to create issue. Please try again.')
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchIssues()
    }, [])

    return {
        issues,
        isLoading,
        error,
        retry: fetchIssues,
        createIssue
    }
} 