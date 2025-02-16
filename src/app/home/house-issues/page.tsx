"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { IssueList } from "./components/issue-list"
import { CreateIssueModal } from "./components/create-issue-modal"
import { useHouseIssues } from "@/hooks/useHouseIssues"
import { LoadingAndErrorStates } from "../../components/LoadingState"
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"

export default function HouseIssuesPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const { issues, isLoading, error, retry, createIssue } = useHouseIssues()
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Open modal if redirected from dashboard
        if (searchParams.get('report_issue') === 'true') {
            setIsCreateModalOpen(true)
        }
    }, [searchParams])

    const handleCreateIssue = async (data: any) => {
        try {
            await createIssue(data)
            setIsCreateModalOpen(false)
            // Clear the query parameter
            router.replace('/home/house-issues')
        } catch (error) {
            console.error('Failed to create issue:', error)
        }
    }

    const handleCloseModal = () => {
        setIsCreateModalOpen(false)
        // Clear the query parameter when closing modal
        router.replace('/home/house-issues')
    }

    if (isLoading || error) {
        return (
            <LoadingAndErrorStates
                isLoading={isLoading}
                error={error !== null}
                errorMessage={error}
                onRetry={retry}
            />
        )
    }

    return (
        <div className="space-y-6 px-4">
            <div className="w-full  py-1 flex items-center justify-between ">
                <Link href={"/home/dashboard"}>
                    <div className="flex items-center gap-x-2  px-2 py-2">
                        <Icon
                            icon={"octicon:arrow-left-24"}
                            className=" text-xl  text-foreground"
                        />
                        <span className="text-sm"> Go back  </span>
                    </div>
                </Link>
            </div>

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">House Issues</h1>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="gap-2"
                >
                    <Plus className="h-4 w-4" />
                    New Issue
                </Button>
            </div>

            <IssueList issues={issues} />

            <CreateIssueModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateIssue}
            />
        </div>
    )
} 