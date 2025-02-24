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
import { IAuthRequest } from "@/app/interfaces/IRegisterRequest"

interface RentAgreementStepProps extends StepProps {
    house: IHouse & {
        price?: number;
        address?: string;
        unit_number?: string;
        description?: string;
        sku?: string;
    }
}

export function RentAgreementStep({ onNext, onPrev, house, data, onUpdate, invite }: RentAgreementStepProps) {
    const [showSummary, setShowSummary] = useState(false)
    const [showSignatureModal, setShowSignatureModal] = useState(false)
    const [signature, setSignature] = useState<File | null>(null)
    const { currentUser } = useAuth()

    const isKycHouse = house.modules?.find(module => module.name === 'kyc')

    const getLicenseAgreementContent = () => {
        const currentDate = new Date(invite?.invite.license_start || new Date()).toLocaleDateString()

        return `
            LICENSE AGREEMENT FOR OCCUPANCY
            This License Agreement ("Agreement") is made and entered into on this day: ${currentDate}, by and between:

            Licensor:
            Name: HomeLett Lettings Limited
            Address: Block C, Road 1, DPK District Estate, Orchid Road, Lekki, Lagos State
            Contact Information: hello@homelett.com | (234) 8065342749

            Licensee:
            Name: ${currentUser?.first_name} ${currentUser?.last_name || ''}
            Address: ${currentUser?.house?.address || '_______________________________'}
            Contact Information: ${currentUser?.email || '_______________________________'}
            Phone: ${currentUser?.phone || '_______________________________'}

            1. NATURE OF AGREEMENT
            This Agreement is a license for occupancy and does not create a tenancy or any interest in land. The Licensee does not have exclusive possession of any room, unit, or space. The Licensor retains full control and management of the premises, including access to the licensed space at any time, with or without prior notice, for inspections, maintenance, or other necessary actions.

            2. PROPERTY DETAILS
            Address: ${currentUser?.house?.address || '________________________'}
            Unit/Room Number: ${currentUser?.sku?.name || '________________'}
            Description: ${currentUser?.sku?.description || '(Include any furnishings, appliances, or amenities provided)'}

            3. LICENSE TERM & RENEWAL
            The License is granted for a fixed period of one (1) year commencing on ${currentDate}.
            This License automatically terminates at the end of the period unless renewed by the Licensor upon full payment of the next period's occupancy fee.
            The Licensee has no automatic right of renewal.

            4. OCCUPANCY FEE & PAYMENT TERMS
            The yearly license fee for the property shall be ₦${currentUser?.sku?.price}
            The full license fee is due within 7 days after the current license expires.
            Payment shall be made via bank transfer to the details provided by the Licensor.
            If payment is not received within 7 days of the due date, this Agreement automatically terminates, and the Licensee must vacate the premises immediately.
            A late fee of ₦${(currentUser?.sku?.price || 0) * 0.1} will apply if payment is delayed beyond the due date.
            Utilities and other expenses are separate and are to be paid by the Licensee.

            5. SECURITY DEPOSIT
            A security deposit of ₦${((currentUser?.sku?.price || 0) * 0.5).toLocaleString()} is required before occupancy.
            The deposit will be used for damages, repairs, or replacement of items due to misuse or neglect by the Licensee.
            Refund of the security deposit (if any) will only be processed after the Licensee vacates the premises and a new Licensee takes over the unit.

            6. ACCESS & INSPECTION
            The Licensee acknowledges that they do not have exclusive possession of the premises.
            The Licensor, its agents, or representatives reserve the right to access the unit/room at any time, with or without prior notice, for periodic inspections, maintenance, or other necessary reasons.
            Failure to provide access when required will result in immediate termination of this License.
            The licensor can make necessary changes to the rooms/unit/premises to enhance operation, at the licensor sole discretion and without notice.

            7. USE OF PREMISES & BEHAVIORAL CONDUCT
            The Licensee agrees to:
            - Maintain the property in good condition.
            - Report necessary repairs through the designated digital platform.
            - No pets, no smoking within the premises.
            - Refrain from engaging in any form of violence, threats, or disruptive behavior within the estate.
            Failure to adhere to this clause is grounds for immediate termination of this Agreement.

            8. TERMINATION & VACATION OF PREMISES
            If the Licensee fails to renew their license at the expiration of this license, or violates any terms of this Agreement, they must vacate the premises within 24 hours of termination notice.
            If the Licensee fails to vacate, the Licensor reserves the right to take possession of the unit and remove all belongings without liability.
            Any items left behind after termination may be disposed of at the Licensee's risk and expense.

            9. LIABILITY & INSURANCE
            The Licensee is responsible for any damage or injury occurring in the licensed space due to their actions.
            The Licensee is required to obtain renters' insurance if necessary.
            The Licensor is not responsible for loss, theft, or damage to personal belongings.

            10. LEGAL REVIEW & GOVERNING LAW
            This Agreement is not subject to Lagos State Tenancy Law or any other tenancy regulations in Nigeria.
            The Licensee waives all rights under tenancy laws and agrees that this is a temporary, non-transferable License.
            Any disputes shall be resolved under Nigerian contract law.
        `
    }

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

    const agreementContent = isKycHouse ? (
        <div className="h-[350px] overflow-y-auto border p-4 rounded-md bg-white">
            <h4 className="font-semibold mb-4 text-[0.78rem]">License Agreement</h4>
            <pre className="whitespace-pre-wrap text-[0.78rem] font-sans leading-relaxed">
                <div className="space-y-6">
                    <div className="text-left font-semibold">
                        LICENSE AGREEMENT FOR OCCUPANCY
                    </div>

                    <div>
                        This License Agreement ("Agreement") is made and entered into on this day: {invite?.invite.license_start}, by and between:
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="font-semibold">Licensor:</div>
                            <div className="pl-4">
                                Name: HomeLett Lettings Limited<br />
                                Address: Block C, Road 1, DPK District Estate, Orchid Road, Lekki, Lagos State<br />
                                Contact Information: hello@homelett.com | (234) 8065342749
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="font-semibold">Licensee:</div>
                            <div className="pl-4">
                                Name: {currentUser?.first_name} {currentUser?.last_name || ''}<br />
                                Address: {currentUser?.house?.address || '_______________________________'}<br />
                                Contact Information: {currentUser?.email || '_______________________________'}<br />
                                Phone: {currentUser?.phone || '_______________________________'}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((section) => (
                            <div key={section} className="space-y-2">
                                <div className="font-semibold">{section}. {getSectionTitle(section)}</div>
                                <div className="pl-4">
                                    {getSectionContent(currentUser!, section)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </pre>
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
                        {isKycHouse ? 'License Agreement' : 'Service Level Agreement'}
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
                            I have read and agree to the terms of the {isKycHouse ? 'license' : 'service level'} agreement
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

// Helper functions to organize content
const getSectionTitle = (section: number): string => {
    const titles = {
        1: 'NATURE OF AGREEMENT',
        2: 'PROPERTY DETAILS',
        3: 'LICENSE TERM & RENEWAL',
        4: 'OCCUPANCY FEE & PAYMENT TERMS',
        5: 'SECURITY DEPOSIT',
        6: 'ACCESS & INSPECTION',
        7: 'USE OF PREMISES & BEHAVIORAL CONDUCT',
        8: 'TERMINATION & VACATION OF PREMISES',
        9: 'LIABILITY & INSURANCE',
        10: 'LEGAL REVIEW & GOVERNING LAW'
    };
    return titles[section as keyof typeof titles];
};

const getSectionContent = (currentUser: IAuthRequest, section: number): JSX.Element => {
    const currentDate = new Date().toLocaleDateString()

    switch (section) {
        case 1:
            return (
                <div>
                    This Agreement is a license for occupancy and does not create a tenancy or any interest in land.
                    The Licensee does not have exclusive possession of any room, unit, or space.
                    The Licensor retains full control and management of the premises, including access to the licensed
                    space at any time, with or without prior notice, for inspections, maintenance, or other necessary actions.
                </div>
            );
        case 2:
            return (
                <div className="space-y-1">
                    Address: {currentUser?.house?.address || '________________________'}<br />
                    Unit/Room Number: {currentUser?.sku?.name || '________________'}<br />
                    Description: {currentUser?.sku?.description || '(Include any furnishings, appliances, or amenities provided)'}
                </div>
            );
        case 3:
            return (
                <div className="space-y-2">
                    The License is granted for a fixed period of one (1) year commencing on {currentDate}.<br />
                    This License automatically terminates at the end of the period unless renewed by the Licensor upon full payment of the next period's occupancy fee.<br />
                    The Licensee has no automatic right of renewal.
                </div>
            );
        case 4:
            return (
                <div className="space-y-2">
                    <div>The yearly license fee for the property shall be ₦{currentUser?.sku?.price?.toLocaleString()}</div>
                    <div>The full license fee is due within 7 days after the current license expires.</div>
                    <div>Payment shall be made via bank transfer to the details provided by the Licensor.</div>
                    <div>If payment is not received within 7 days of the due date, this Agreement automatically terminates, and the Licensee must vacate the premises immediately.</div>
                    <div>A late fee of ₦{((currentUser?.sku?.price || 0) * 0.1).toLocaleString()} will apply if payment is delayed beyond the due date.</div>
                    <div>Utilities and other expenses are separate and are to be paid by the Licensee.</div>
                </div>
            );
        case 5:
            return (
                <div className="space-y-2">
                    <div>A security deposit of ₦{((currentUser?.sku?.price || 0) * 0.5).toLocaleString()} is required before occupancy.</div>
                    <div>The deposit will be used for damages, repairs, or replacement of items due to misuse or neglect by the Licensee.</div>
                    <div>Refund of the security deposit (if any) will only be processed after the Licensee vacates the premises and a new Licensee takes over the unit.</div>
                </div>
            );
        case 6:
            return (
                <div className="space-y-2">
                    <div>The Licensee acknowledges that they do not have exclusive possession of the premises.</div>
                    <div>The Licensor, its agents, or representatives reserve the right to access the unit/room at any time, with or without prior notice, for periodic inspections, maintenance, or other necessary reasons.</div>
                    <div>Failure to provide access when required will result in immediate termination of this License.</div>
                    <div>The licensor can make necessary changes to the rooms/unit/premises to enhance operation, at the licensor sole discretion and without notice.</div>
                </div>
            );
        case 7:
            return (
                <div className="space-y-2">
                    <div>The Licensee agrees to:</div>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Maintain the property in good condition.</li>
                        <li>Report necessary repairs through the designated digital platform.</li>
                        <li>No pets, no smoking within the premises.</li>
                        <li>Refrain from engaging in any form of violence, threats, or disruptive behavior within the estate.</li>
                    </ul>
                    <div>Failure to adhere to this clause is grounds for immediate termination of this Agreement.</div>
                </div>
            );
        case 8:
            return (
                <div className="space-y-2">
                    <div>If the Licensee fails to renew their license at the expiration of this license, or violates any terms of this Agreement, they must vacate the premises within 24 hours of termination notice.</div>
                    <div>If the Licensee fails to vacate, the Licensor reserves the right to take possession of the unit and remove all belongings without liability.</div>
                    <div>Any items left behind after termination may be disposed of at the Licensee's risk and expense.</div>
                </div>
            );
        case 9:
            return (
                <div className="space-y-2">
                    <div>The Licensee is responsible for any damage or injury occurring in the licensed space due to their actions.</div>
                    <div>The Licensee is required to obtain renters' insurance if necessary.</div>
                    <div>The Licensor is not responsible for loss, theft, or damage to personal belongings.</div>
                </div>
            );
        case 10:
            return (
                <div className="space-y-2">
                    <div>This Agreement is not subject to Lagos State Tenancy Law or any other tenancy regulations in Nigeria.</div>
                    <div>The Licensee waives all rights under tenancy laws and agrees that this is a temporary, non-transferable License.</div>
                    <div>Any disputes shall be resolved under Nigerian contract law.</div>
                </div>
            );
    }
    return <></>;
};

