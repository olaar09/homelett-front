"use client"

import { useState, type ReactElement } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { RegisterFormData } from "@/app/interfaces/IRegister"
import { BioInfoStep, onSignupUser } from "./bio-info"

import { IAuthRequest, IHouseInvite } from "../../interfaces/IRegisterRequest"
import { ContactDetailsStep } from "./contact-details-step"
import { RentAgreementStep } from "./rent-agreement-step"
import { NextOfKinStep } from "./next-of-kin-step"
import { IHouse } from "@/app/interfaces/IHouse"
import HouseInfoStep from "./house-info-step"

import { useAuth } from "@/contexts/AuthContext"
import APIUtil from "@/services/APIUtil"
import { SuccessStep } from "./success-step"
import { IHouseSKU } from "@/app/interfaces/IRegisterRequest"


interface RegisterFormProps {
    currentStep: number
    setCurrentStep: (step: number) => void
    formData: RegisterFormData
    setFormData: (data: RegisterFormData) => void
    totalSteps: number
    currentUser: IAuthRequest | null
    invite: IHouseInvite
}

export default function RegisterForm({
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    totalSteps,
    currentUser,
    invite
}: RegisterFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { house, sku } = invite
    const apiService = new APIUtil()
    const authContext = useAuth()

    const handleUpdateData = (data: Partial<RegisterFormData>) => {
        setFormData({ ...formData, ...data })
    }


    const handleNext = async () => {
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
            sku={sku}
            onNext={handleNext}
        />,
        <BioInfoStep
            key="bio"
            data={formData}
            onUpdate={handleUpdateData}
            onNext={handleNext}
            onPrev={handlePrev}
            house_id={house.id}
            sku_id={sku?.id}
            invite_code={invite.invite.invite_code}
        />,
        ...(house.modules.some(module => module.name.toLowerCase() === 'kyc') ? [
            <ContactDetailsStep
                key="contact"
                data={formData}
                onUpdate={handleUpdateData}
                onNext={handleNext}
                onPrev={handlePrev}
                invite_code={invite.invite.invite_code}
            />,
            <NextOfKinStep
                key="kin"
                data={formData}
                onUpdate={handleUpdateData}
                onNext={handleNext}
                onPrev={handlePrev}
                invite_code={invite.invite.invite_code}
            />,
        ] : []),
        <RentAgreementStep
            key="rent"
            data={formData}
            house={house}
            onUpdate={handleUpdateData}
            onNext={handleNext}
            onPrev={handlePrev}
            invite_code={invite.invite.invite_code}
        />,
        <SuccessStep
            key="success"
            houseName={house.house_name}
            invite_code={invite.invite.invite_code}
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

