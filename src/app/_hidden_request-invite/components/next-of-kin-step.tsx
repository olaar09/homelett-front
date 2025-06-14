import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RegisterFormData, StepProps } from "@/app/interfaces/IRegister"
import { useAuth } from "@/contexts/AuthContext"
import { AxiosError } from "axios"
import { message } from "antd"
import APIUtil from "@/services/APIUtil"
import { useState } from "react"

export const onAddNextOfKin = async (formData: any) => {
    const apiService = new APIUtil()
    console.log(".....formData.....", formData);
    try {
        let response;
        response = await apiService.authService!.addNextOfKin({
            kin_name: formData.kin_name,
            kin_relationship: formData.kin_relationship,
            kin_phone: formData.kin_phone,
            kin_address: formData.kin_address,
        });
    } catch (error) {
        console.error("Error during Next of Kin:", error);
        throw error;
    }
};


export function NextOfKinStep({ onNext, onPrev }: StepProps) {

    const authContext = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        kin_name: "",
        kin_relationship: "",
        kin_phone: "",
        kin_address: "",
    })

    const onUpdate = (data: Partial<RegisterFormData>) => {
        setFormData({ ...formData, ...data })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            await onAddNextOfKin(formData)
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
            <div className="space-y-2 ">
                <Label className="text-[0.78rem]" htmlFor="kinName">Next of Kin Name</Label>
                <Input
                    id="kinName"
                    placeholder="John Doe"
                    value={formData.kin_name}
                    className="text-[0.78rem]"
                    onChange={(e) => onUpdate({ kin_name: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label className="text-[0.78rem]" htmlFor="kinRelationship">Relationship</Label>
                <Input
                    id="kinRelationship"
                    placeholder="Spouse, Parent, Sibling, etc."
                    value={formData.kin_relationship}
                    className="text-[0.78rem]"
                    onChange={(e) => onUpdate({ kin_relationship: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label className="text-[0.78rem]" htmlFor="kinPhone">Phone Number</Label>
                <Input
                    id="kinPhone"
                    type="tel"
                    placeholder="+234..."
                    value={formData.kin_phone}
                    className="text-[0.78rem]"
                    onChange={(e) => onUpdate({ kin_phone: e.target.value })}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label className="text-[0.78rem]" htmlFor="kinAddress">Address</Label>
                <Input
                    id="kinAddress"
                    placeholder="123 Main St, City, State, ZIP"
                    value={formData.kin_address}
                    className="text-[0.78rem]"
                    onChange={(e) => onUpdate({ kin_address: e.target.value })}
                    required
                />
            </div>
            <div className="flex justify-between">
                <Button type="submit" className="w-full" disabled={isLoading}>
                    <span className="text-sm">Next</span>
                </Button>
            </div>
        </form>
    )
}

