"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HomeLettAvatar } from "@/app/components/Landing/HomeLettAvatar"

export function LoginForm({ onSubmitLogin, onChangeForm, isLoading }: {
    onSubmitLogin: (e: React.FormEvent) => void,
    onChangeForm: (key: string, e: string) => void,
    isLoading: boolean
}) {

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        onSubmitLogin(e)
    }

    return (
        <Card className="w-full py-7 border-none shadow-none text-[0.78rem]">
            <div className="flex justify-center">
                <HomeLettAvatar name="HomeLett" avatarSrc="/favicon.png" isGen={false} width="w-20" height="h-20" />
            </div>

            <CardHeader className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl font-bold">Login to your account</div>
                </div>
                <p className="text-sm text-muted-foreground block text-center">Enter your email and password to login</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2 text-[0.78rem]">
                        <Label className="text-[0.78rem]" htmlFor="email">Email</Label>
                        <Input className="text-[0.78rem]" onChange={(e) => onChangeForm("email", e.target.value)} id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2 text-[0.78rem]">
                        <Label className="text-[0.78rem]" htmlFor="password">Password</Label>
                        <Input className="text-[0.78rem]" id="password" type="password" required onChange={(e) => onChangeForm("password", e.target.value)} />
                    </div>
                    <Button className="w-full " type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

