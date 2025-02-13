"use client"

import { useContext, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react/dist/iconify.js"
import { AuthContext } from "@/contexts/AuthContext"
import UtilService from "@/services/UtilService"
import { Str } from "@/utils/consts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Building2, ChevronDown, ChevronUp, MapPin, Wallet, Wallet2 } from 'lucide-react'

const notifications = [
    {
        title: "Onboarding Successful",
        message: "You have successfully onboarded to HomeLett",
        time: "2 mins ago"
    },
    {
        title: "New Feature",
        message: "You can now schedule automatic payments",
        time: "1 hour ago"
    },
    {
        title: "Upcoming Payment",
        message: "Your next payment is due in 3 days",
        time: "2 hours ago"
    }
] // Replace with your notifications data

export default function KornBalanceCard() {
    const authContext = useContext(AuthContext)
    const utilService = new UtilService()
    const router = useRouter()
    const [isActivitiesOpen, setIsActivitiesOpen] = useState(false)

    const balance = utilService.formatMoney(
        `${authContext.currentUser?.finance?.balance ?? 0}`,
        "en-NG",
        "NGN"
    )

    return (
        <Card className="w-full overflow-hidden bg-gradient-to-br from-white to-slate-50/20">
            <CardContent className="p-5">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[0.78rem] text-slate-600">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>{authContext.currentUser?.house?.house_name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[0.72rem] text-slate-500">
                            <MapPin className="h-3 w-3" />
                            <span>{authContext.currentUser?.house?.address}</span>
                        </div>
                    </div>
                </div>

                {/* Balance Section */}
                <div className="mb-6 text-center flex justify-between items-center">
                    {/*     <div className="flex items-center justify-center gap-2 text-[0.78rem] text-slate-600 mb-1">
                        <Wallet className="h-3.5 w-3.5" />
                        <span>Available Balance</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                        <Wallet className="h-3.5 w-3.5" />
                        <div className="text-[0.78rem] font-semibold text-slate-800 ">{balance}</div>
                    </div>

                    <Link href="/home/add_fund">
                        <div className="flex items-center gap-x-2 bg-black rounded-2xl px-2 py-1">
                            <Wallet2 className="h-3.5 w-3.5 text-white" />
                            <span className="text-[0.78rem] font-semibold text-white">Fund Wallet</span>
                        </div>
                    </Link>
                </div>

                {/* Notifications Section */}
                <div className="space-y-3">
                    <button
                        className="w-full flex items-center justify-between text-[0.78rem] text-slate-600 hover:text-slate-800 transition-colors"
                        onClick={() => setIsActivitiesOpen(!isActivitiesOpen)}
                    >
                        <div className="flex items-center gap-2">
                            <Bell className="h-3.5 w-3.5" />
                            <span>Recent Activities</span>
                        </div>
                        {isActivitiesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {isActivitiesOpen && (
                        notifications.length === 0 ? (
                            <div className="bg-white/50 backdrop-blur-sm rounded-lg border border-slate-100 p-4 text-center">
                                <p className="text-[0.78rem] text-slate-500">You&apos;re all caught up!</p>
                            </div>
                        ) : (
                            <div className="relative h-[120px]">
                                {notifications.map((notification, index) => (
                                    <div
                                        key={index}
                                        className={`absolute left-0 right-0 bg-white rounded-lg border border-slate-100 p-3 shadow-sm transition-all duration-300 cursor-pointer
                                ${index === 0 ? 'top-0 z-30 hover:-translate-y-1' :
                                                index === 1 ? 'top-2 z-20 hover:-translate-y-3' :
                                                    'top-4 z-10 hover:-translate-y-5'}`}
                                        style={{
                                            transform: `scale(${1 - index * 0.05})`,
                                            opacity: 1 - index * 0.2
                                        }}
                                    >
                                        <div className="space-y-1">
                                            <p className="text-[0.78rem] font-medium text-slate-700 truncate">{notification.title}</p>
                                            <p className="text-[0.72rem] text-slate-500 truncate">{notification.message}</p>
                                        </div>
                                        <p className="text-[0.65rem] text-slate-400 mt-2">{notification.time}</p>
                                    </div>
                                ))}
                            </div>
                        )
                    )}
                </div>

                {/* Footer Section */}
            </CardContent>
        </Card>
    )
}
