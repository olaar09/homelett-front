import { IAuthRequest, IHouseInvite } from "@/app/interfaces/IRegisterRequest"

export const getSectionTitle = (section: number): string => {
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

export const getSectionContent = (currentUser: IAuthRequest, invite: IHouseInvite, section: number): JSX.Element => {
    const currentDate = new Date(invite?.invite.license_start).toLocaleDateString()

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
                    <div>The yearly service charge for your occupancy shall be ₦{currentUser?.sku?.service_charge?.toLocaleString()}</div>
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