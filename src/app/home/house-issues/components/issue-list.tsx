import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { IHouseIssue } from "@/app/interfaces/IHouseIssue"
import { CalendarDays, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import IssueItem from "./issue-item"

interface IssueListProps {
    issues: IHouseIssue[] | null
}

export function IssueList({ issues }: IssueListProps) {
    if (!issues || issues.length === 0) {
        return (
            <Card className="border-dashed">
                <CardContent className="pt-6 pb-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="h-6 w-6 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">No issues reported</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const getSeverityColor = (severity: IHouseIssue['severity']) => {
        switch (severity) {
            case 'critical':
                return 'bg-red-50 text-red-700 border-red-200'
            case 'high':
                return 'bg-orange-50 text-orange-700 border-orange-200'
            case 'medium':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200'
            case 'low':
                return 'bg-green-50 text-green-700 border-green-200'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200'
        }
    }

    const getStatusColor = (status: IHouseIssue['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200'
            case 'in_progress':
                return 'bg-blue-50 text-blue-700 border-blue-200'
            case 'resolved':
                return 'bg-green-50 text-green-700 border-green-200'
            case 'cancelled':
                return 'bg-gray-50 text-gray-700 border-gray-200'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200'
        }
    }

    return (
        <div className="space-y-4">
            {issues.map((issue) => (
                <IssueItem key={issue.id} issue={issue} />
            ))}
        </div>
    )
} 