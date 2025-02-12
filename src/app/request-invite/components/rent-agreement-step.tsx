import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { StepProps } from "@/app/interfaces/IRegister"
import { IHouse } from "@/app/interfaces/IHouse"
import { SummaryModal } from "./summary-modal"
import { useState } from "react"
import { SignatureUpload } from "./signature-upload"

interface RentAgreementStepProps extends StepProps {
    house: IHouse
}

export function RentAgreementStep({ onNext, onPrev, house, data, onUpdate }: RentAgreementStepProps) {
    const [showSummary, setShowSummary] = useState(false)
    const [showSignatureModal, setShowSignatureModal] = useState(false)
    const [signature, setSignature] = useState<File | null>(null)

    const onSignatureValidated = () => {
        // setSignature(file)
        onNext()
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

    const agreementContent = house.modules?.find(module => module.name === 'kyc') ? (
        <div className="h-40 overflow-y-auto border p-4 rounded-md">
            <h4 className="font-semibold mb-2 text-[0.78rem]">Tenancy Agreement</h4>
            <p className="text-[0.78rem]">
                This Tenancy Agreement outlines the terms and conditions for residing in the property.
                Key aspects include:
            </p>
            <ul className="list-disc pl-5 mt-2 text-[0.78rem]">
                <li>Rent payment terms and schedule</li>
                <li>Security deposit requirements</li>
                <li>Maintenance responsibilities</li>
                <li>Duration of tenancy</li>
                <li>Property usage guidelines</li>
            </ul>
        </div>
    ) : (
        <div className="h-40 overflow-y-auto border p-4 rounded-md">
            <h4 className="font-semibold mb-2 text-[0.78rem]">Service Level Agreement</h4>
            <p className="text-[0.78rem]">
                This Service Level Agreement defines the terms of service provision.
                Key aspects include:
            </p>
            <ul className="list-disc pl-5 mt-2 text-[0.78rem]">
                <li>Service description and scope</li>
                <li>Service delivery timeline</li>
                <li>Performance metrics</li>
                <li>Payment terms</li>
                <li>Service support and maintenance</li>
            </ul>
        </div>
    );

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                    <h3 className="text-[0.78rem] font-semibold">
                        {house.modules?.find(module => module.name === 'kyc') ? 'Tenancy Agreement' : 'Service Level Agreement'}
                    </h3>
                    <p className="text-[0.78rem] text-gray-600">
                        Please read the following agreement carefully and check the box below to indicate your agreement.
                    </p>
                    {agreementContent}
                    <div className="flex items-center space-x-2 text-[0.78rem]">
                        <Checkbox
                            id="rentAgreement"
                            checked={data.rent_agreement}
                            onCheckedChange={(checked) => onUpdate({ rent_agreement: checked as boolean })}
                        />
                        <Label className="text-[0.78rem]" htmlFor="rentAgreement">
                            I have read and agree to the terms of the {house.modules?.find(module => module.name === 'kyc') ? 'tenancy' : 'service level'} agreement
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

