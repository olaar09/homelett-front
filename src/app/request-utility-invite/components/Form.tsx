"use client"

import { useState, type ReactElement } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { RegisterFormData } from "@/app/interfaces/IRegister"

import { IAuthRequest, IHouseInvite } from "../../interfaces/IRegisterRequest"

import { IHouse } from "@/app/interfaces/IHouse"

import { useAuth } from "@/contexts/AuthContext"
import APIUtil from "@/services/APIUtil"
import { SuccessStep } from "@/app/request-invite/components/success-step"
import HouseInfoStep from "@/app/request-invite/components/house-info-step"
import { BioInfoStep } from "@/app/request-invite/components/bio-info"
import { SubmitBioInfoStep } from "@/app/request-invite/components/utility-info"


interface RegisterFormProps {
    currentStep: number
    setCurrentStep: (step: number) => void
    formData: RegisterFormData
    setFormData: (data: RegisterFormData) => void
    totalSteps: number
    currentUser: IAuthRequest | null
    invite: IHouse
    refreshHouse: () => any
}

export default function RegisterForm({
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    totalSteps,
    currentUser,
    invite,
    refreshHouse
}: RegisterFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const house = invite
    const apiService = new APIUtil()
    const authContext = useAuth()

    const handleUpdateData = (data: Partial<RegisterFormData>) => {
        setFormData({ ...formData, ...data })
    }


    const handleNext = async () => {
        console.log("currentStep", formData)
        if (currentStep < totalSteps - 1) {
            switch (currentStep) {
                case 0:
                    const profile = authContext.currentUser
                    if (profile) {
                        setCurrentStep(profile.onboarding_step)
                    } else {
                        setCurrentStep(currentStep + 1)
                    }
                    break
                default:
                    setCurrentStep(currentStep + 1)
            }
        }
    }


    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const steps: ReactElement[] = [
        <HouseInfoStep
            key="house-info"
            house={house}
            sku={undefined}
            onNext={handleNext}
        />,
        <BioInfoStep
            key="bio"
            data={formData}
            onUpdate={handleUpdateData}
            onNext={handleNext}
            onPrev={handlePrev}
            house_id={house.id}
            sku_id={undefined}
            invite_code={undefined}
            is_utility_signup={true}
        />,
        <SubmitBioInfoStep
            key="submitBio"
            data={formData}
            onUpdate={handleUpdateData}
            onNext={handleNext}
            onPrev={handlePrev}
            house_id={house.id}
            sku_id={undefined}
            invite_code={undefined}
            is_utility_signup={true}
        />,
        <SuccessStep
            key="success"
            houseName={house.house_name}
            document_path={undefined}
        />,
        /*         <PaymentAgreementStep
                    key="payment"
                    data={formData}
                    onUpdate={handleUpdateData}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />, */
    ]

    return (
        <Card className="w-full border-none shadow-none p-0">
            {/*   {currentStep < totalSteps - 1 && (
                <CardHeader className="space-y-1">
                    {currentStep > 0 && (
                        <Button variant="ghost" size="icon" onClick={handlePrev}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    )}
                </CardHeader>
            )} */}
            <CardContent className="p-0 h-96">
                {steps[Math.min(currentStep, steps.length - 1)]}
            </CardContent>
        </Card >
    )
}

