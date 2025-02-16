"use client"

import { useHousePayments } from "@/hooks/useHousePayments"
import PaymentList from "./components/payment-list"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw, RotateCw } from "lucide-react"
import { LoadingAndErrorStates } from "../../components/LoadingState"
import Link from "next/link"
import { Icon } from "@iconify/react/dist/iconify.js"

export default function HousePaymentsPage() {
    const { payments, isLoading, error, retry } = useHousePayments()





    return (
        <div className="space-y-6">
            <div className="w-full  py-1 flex items-center justify-between px-2">
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

            {(isLoading || error) && (!payments) &&
                <div className="flex items-center justify-center min-h-screen">
                    <LoadingAndErrorStates
                        isLoading={isLoading}
                        error={error !== null}
                        errorMessage={error}
                        onRetry={retry}
                    />
                </div>
            }

            {((!isLoading && !error) || ((payments))) &&
                <div className="px-4 flex flex-col gap-y-2">
                    <div className="flex items-center justify-between px-0">
                        <h1 className="text-sm font-semibold tracking-tight">House Payments</h1>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={retry}
                        >
                            <RotateCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>

                    <div className="flex items-center justify-between px-0">
                        <span className="text-xs text-muted-foreground">
                            Payments will be automatically deducted from your wallet when due. Please fund your wallet with enough balance to avoid any issues.
                        </span>
                    </div>

                </div>

            }
            {((!isLoading && !error) || ((payments))) && <PaymentList payments={payments ?? []} />}
        </div>
    )
} 