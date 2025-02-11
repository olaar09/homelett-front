import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React
import { RegisterFormData, StepProps } from "@/app/interfaces/IRegister"
import { message } from "antd"
import { AxiosError } from "axios"
import router from "next/router"
import { useAuth } from "@/contexts/AuthContext"
import APIUtil from "@/services/APIUtil"
import { useState } from "react"
import { useParams } from "next/navigation"


export const onSignupUser = async (formData: any, house_id: string) => {
    const apiService = new APIUtil()
    console.log(".....formData.....", formData);
    try {
        let response;
        response = await apiService.authService!.register({
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            first_name: formData.first_name,
            last_name: formData.last_name,
            onboarding_step: 0,
            house_id: house_id
        });

        // Add debugging logs
        console.log("Response data:", response.data);
        console.log("Access token:", response.data.access_token);

        if (!response.data.access_token) {
            throw new Error("No access token received from server");
        }

        localStorage.setItem("token", response.data.access_token);

        // Verify the token was set
        const storedToken = localStorage.getItem("token");
        console.log("Stored token:", storedToken);
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
};



export function BioInfoStep({ onNext, house_id }: StepProps) {


    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
    })

    const authContext = useAuth()

    const onUpdate = (data: Partial<RegisterFormData>) => {
        setFormData({ ...formData, ...data })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await onSignupUser(formData, house_id!)
            await authContext.refreshProfile();
            onNext()
        } catch (error) {
            console.log(".....error.....", error);
            if (error instanceof AxiosError) {
                message.error(
                    `${error?.response?.data?.message ??
                    error?.response?.data?.reason ??
                    "Unable to complete request"
                    }`
                );
            } else {
                message.error("Unable to complete request");
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-x-2 items-center w-full space-y-4 md:space-y-0">
                <div className="w-full md:w-1/2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                        id="first_name"
                        type="text"
                        placeholder="John "
                        value={formData.first_name}
                        onChange={(e) => onUpdate({ first_name: e.target.value })}
                        required
                    />
                </div>

                <div className="w-full md:w-1/2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                        id="last_name"
                        type="text"
                        placeholder="Doe"
                        value={formData.last_name}
                        onChange={(e) => onUpdate({ last_name: e.target.value })}
                        required
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={(e) => onUpdate({ email: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={(e) => onUpdate({ phone: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => onUpdate({ password: e.target.value })}
                    required
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                Next
            </Button>
        </form>
    )
}

