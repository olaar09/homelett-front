import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { StepProps } from "@/app/interfaces/IRegister"
import { IHouse } from "@/app/interfaces/IHouse"
import { SummaryModal } from "./summary-modal"
import { useState } from "react"
import { SignatureUpload } from "./signature-upload"
import { useAuth } from "@/contexts/AuthContext"
import { LicenseAgreementContent } from "./license-agreement-content"
import { ServiceAgreementContent } from "./service-agreement-content"
import APIUtil from "@/services/APIUtil"

interface RentAgreementStepProps extends StepProps {
    house: IHouse & {
        price?: number;
        address?: string;
        unit_number?: string;
        description?: string;
        sku?: string;
    }
    refreshHouse: () => Promise<void>
}

export function RentAgreementStep({ onNext, onPrev, house, data, onUpdate, invite, refreshHouse }: RentAgreementStepProps) {
    const [showSummary, setShowSummary] = useState(false)
    const [showSignatureModal, setShowSignatureModal] = useState(false)
    const [signature, setSignature] = useState<File | null>(null)
    const { currentUser } = useAuth()

    const isKycHouse = house.modules?.find(module => module.name === 'kyc')

    const onSignatureValidated = async (documentPath: string) => {
        try {
            await refreshHouse()
            onNext()
        } catch (error) {
            console.error('Error refreshing house invite:', error)
            onNext()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!data.rent_agreement) {
            alert("You must agree to the terms to continue.")
            return
        }

        if (!signature) {
            setShowSignatureModal(true)
            return
        }

        onNext()
    }

    const agreementContent = isKycHouse ? (
        <div className="h-[350px] overflow-y-auto border p-4 rounded-md bg-white">
            <h4 className="font-semibold mb-4 text-[0.78rem]">License Agreement</h4>
            <pre className="whitespace-pre-wrap text-[0.78rem] font-sans leading-relaxed">
                <LicenseAgreementContent currentUser={currentUser!} invite={invite} />
            </pre>
        </div>
    ) : (
        <div className="h-[350px] overflow-y-auto border p-4 rounded-md bg-white">
            <ServiceAgreementContent currentUser={currentUser!} />
        </div>
    );

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <h3 className="text-[0.78rem] font-semibold">
                        {isKycHouse ? 'License Agreement' : 'Service Level Agreement'}
                    </h3>
                    <p className="text-[0.78rem] text-gray-600">
                        Please read the following agreement carefully and click <br /> <span className="font-semibold">I agree to the terms</span> below to indicate your agreement.
                    </p>
                    {agreementContent}
                    <div className="flex items-center space-x-2 text-[0.78rem]">
                        <Checkbox
                            id="rentAgreement"
                            checked={data.rent_agreement}
                            onCheckedChange={(checked) => onUpdate({ rent_agreement: checked as boolean })}
                        />
                        <Label className="text-[0.78rem]" htmlFor="rentAgreement">
                            I  agree to the terms of the {isKycHouse ? 'license' : 'service level'} agreement
                        </Label>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowSummary(true)}
                    >
                        <span className="text-[0.78rem]">View Summary</span>
                    </Button>
                    <Button
                        type="submit"
                        disabled={!data.rent_agreement}
                    >
                        <span className="text-[0.78rem]">
                            {signature ? 'Complete onboarding' : 'Upload Signature'}
                        </span>
                    </Button>
                </div>
            </form>

            <SignatureUpload
                isOpen={showSignatureModal}
                onClose={() => setShowSignatureModal(false)}
                onSignatureValidated={onSignatureValidated}
            />

            <SummaryModal
                isOpen={showSummary}
                onClose={() => setShowSummary(false)}
                house={house}
            />
        </div>
    )
}

