'use client'

import { Loader2, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface LoadingAndErrorStatesProps {
    isLoading: boolean
    error: boolean | null
    errorMessage: string | null
    onRetry: () => void
}

export function LoadingAndErrorStates({ errorMessage, isLoading, error, onRetry }: LoadingAndErrorStatesProps) {
    if (isLoading) {
        return (
            <div className='mx-auto flex flex-col items-center justify-center h-full'>
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
            </div>
        )
    }

    if (error) {
        return (
            <div className='mx-auto flex flex-col items-center justify-center h-full gap-y-4'>
                <span className='text-xs text-center'> {errorMessage} </span>
                <Button onClick={onRetry}>Try Again</Button>
            </div>
        )
    }

    return null
}

