import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RegisterFormData, StepProps } from "@/app/interfaces/IRegister"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import APIUtil from "@/services/APIUtil"
import { AxiosError } from "axios"
import { message } from "antd"


export const onAddKYC = async (formData: any) => {
    const apiService = new APIUtil()
    console.log(".....formData.....", formData);
    try {
        let response;
        response = await apiService.authService!.addKYC({
            current_address: formData.current_address,
            work_address: formData.work_address,
            occupation: formData.occupation,
            nin: formData.nin,
        });
    } catch (error) {
        console.error("Error during KYC:", error);
        throw error;
    }
};



export function ContactDetailsStep({ onNext, onPrev }: StepProps) {
    const authContext = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await onAddKYC(formData)
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

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        current_address: "",
        work_address: "",
        occupation: "",
        nin: "",
    })

    const onUpdate = (data: Partial<RegisterFormData>) => {
        setFormData({ ...formData, ...data })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label className="text-[0.78rem]" htmlFor="currentAddress">Current Address</Label>
                <Input
                    id="currentAddress"
                    placeholder="123 Main St, City, State, ZIP"
                    value={formData.current_address}
                    className="text-[0.78rem]"
                    onChange={(e) => onUpdate({ current_address: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label className="text-[0.78rem]" htmlFor="previousAddress">Occupation</Label>
                <Input
                    id="occupation"
                    placeholder="Software Engineer"
                    value={formData.occupation}
                    className="text-[0.78rem]"
                    onChange={(e) => onUpdate({ occupation: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label className="text-[0.78rem]" htmlFor="city">Work Address</Label>
                <Input
                    id="work_address"
                    placeholder="Victoria Island, Lagos.."
                    value={formData.work_address}
                    className="text-[0.78rem]"
                    onChange={(e) => onUpdate({ work_address: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label className="text-[0.78rem]" htmlFor="nin">NIN</Label>
                <Input
                    id="nin"
                    placeholder="0992999992993"
                    value={formData.nin}
                    className="text-[0.78rem]"
                    onChange={(e) => onUpdate({ nin: e.target.value })}
                    required
                />
            </div>
            <div className="flex justify-between">
                <Button type="submit" className="w-full" disabled={isLoading}>
                    Next
                </Button>
            </div>
        </form>
    )
}

