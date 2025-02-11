import type React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { StepProps } from "@/app/interfaces/IRegister"
import { IHouse } from "@/app/interfaces/IHouse"
import { SummaryModal } from "./summary-modal"
import { useState } from "react"

interface RentAgreementStepProps extends StepProps {
    house: IHouse
}

export function RentAgreementStep({ onNext, onPrev, house, data, onUpdate }: RentAgreementStepProps) {
    const [showSummary, setShowSummary] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (data.rent_agreement) {
            onNext()
        } else {
            alert("You must agree to the terms to continue.")
        }
    }

    const agreementContent = house.modules?.find(module => module.name === 'kyc') ? (
        <div className="h-40 overflow-y-auto border p-4 rounded-md">
            <h4 className="font-semibold mb-2">Tenancy Agreement</h4>
            <p>
                This Tenancy Agreement outlines the terms and conditions for residing in the property.
                Key aspects include:
            </p>
            <ul className="list-disc pl-5 mt-2">
                <li>Rent payment terms and schedule</li>
                <li>Security deposit requirements</li>
                <li>Maintenance responsibilities</li>
                <li>Duration of tenancy</li>
                <li>Property usage guidelines</li>
            </ul>
        </div>
    ) : (
        <div className="h-40 overflow-y-auto border p-4 rounded-md">
            <h4 className="font-semibold mb-2">Service Level Agreement</h4>
            <p>
                This Service Level Agreement defines the terms of service provision.
                Key aspects include:
            </p>
            <ul className="list-disc pl-5 mt-2">
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
                    <h3 className="text-lg font-semibold">
                        {house.modules?.find(module => module.name === 'kyc') ? 'Tenancy Agreement' : 'Service Level Agreement'}
                    </h3>
                    <p className="text-sm text-gray-600">
                        Please read the following agreement carefully and check the box below to indicate your agreement.
                    </p>
                    {agreementContent}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="rentAgreement"
                            checked={data.rent_agreement}
                            onCheckedChange={(checked) => onUpdate({ rent_agreement: checked as boolean })}
                        />
                        <Label htmlFor="rentAgreement">
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
                        View Summary
                    </Button>
                    <Button type="submit" disabled={!data.rent_agreement}>
                        Complete onboarding
                    </Button>
                </div>
            </form>

            <SummaryModal
                isOpen={showSummary}
                onClose={() => setShowSummary(false)}
                house={house}
            />
        </div>
    )
}

