import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { IHousePayment } from "@/app/interfaces/IHousePayment"
import { formatCurrency } from "@/lib/utils"
import { CalendarDays, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaymentListProps {
    payments: IHousePayment[] | null
}

export function PaymentList({ payments }: PaymentListProps) {
    if (!payments || payments.length === 0) {
        return (
            <Card className="border-dashed">
                <CardContent className="pt-6 pb-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="h-6 w-6 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">No payments found</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const getIntervalColor = (interval: IHousePayment['interval']) => {
        switch (interval) {
            case 'single':
                return 'bg-blue-50 text-blue-700 border-blue-200'
            case 'monthly':
                return 'bg-purple-50 text-purple-700 border-purple-200'
            case 'weekly':
                return 'bg-green-50 text-green-700 border-green-200'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200'
        }
    }

    const getStatusColor = (status: IHousePayment['status']) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200'
            case 'completed':
                return 'bg-green-50 text-green-700 border-green-200'
            case 'failed':
                return 'bg-red-50 text-red-700 border-red-200'
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200'
        }
    }

    return (
        <div className="space-y-4">
            {payments.map((payment) => (
                <Card key={payment.id} className="overflow-hidden border">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                                <h3 className="font-medium leading-none">
                                    {payment.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {payment.description}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <p className="text-lg font-semibold">
                                    {formatCurrency(payment.amount)}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge
                                        variant="secondary"
                                        className={cn("rounded-md border",
                                            getIntervalColor(payment.interval)
                                        )}
                                    >
                                        {payment.interval}
                                    </Badge>
                                    <Badge
                                        variant="secondary"
                                        className={cn("rounded-md border",
                                            getStatusColor(payment.status)
                                        )}
                                    >
                                        {payment.status}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <CalendarDays className="h-4 w-4" />
                                <span>
                                    {new Date(payment.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>
                                    {new Date(payment.created_at).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
} 