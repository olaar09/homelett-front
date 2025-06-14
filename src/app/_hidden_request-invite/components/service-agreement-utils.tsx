import { IAuthRequest } from "@/app/interfaces/IRegisterRequest"

export const getSectionTitle = (section: number): string => {
    const titles = {
        1: 'INTRODUCTION',
        2: 'OWNERSHIP OF METER',
        3: 'METER USAGE AND MAINTENANCE FEES',
        4: 'RETRIEVAL AND TERMINATION',
        5: 'RESPONSIBILITIES OF THE USER',
        6: 'LIABILITY DISCLAIMER',
        7: 'AMENDMENTS AND UPDATES',
        8: 'CONTACT INFORMATION'
    };
    return titles[section as keyof typeof titles];
};

export const getSectionContent = (currentUser: IAuthRequest, section: number): JSX.Element => {
    switch (section) {
        case 1:
            return (
                <div>
                    This Service Level Agreement ("Agreement") outlines the terms and conditions governing the use of the prepaid electricity meter ("Meter") provided by Homelett Lettings LTD ("Provider") within {currentUser?.house?.address}. By using the Meter, the User agrees to be bound by the terms of this Agreement.
                </div>
            );
        case 2:
            return (
                <div>
                    The Meter remains the sole property of Homelett Lettings LTD. The User acknowledges that they do not own the Meter and that it has been provided solely for the purpose of facilitating electricity utility management within the HMO.
                </div>
            );
        case 3:
            return (
                <div className="space-y-2">
                    <div>a. The Meter is a prepaid device that allows Users to purchase electricity credit.</div>
                    <div>b. A maintenance fee of at least 1% of the recharge value may be charged to cover ongoing Meter servicing and to maintain adequate PHCN credit at all times depending on the conditions in the specific area.</div>
                    <div>c. Users are responsible for ensuring sufficient prepaid balance is maintained on the assigned meter device for uninterrupted service.</div>
                </div>
            );
        case 4:
            return (
                <div className="space-y-2">
                    <div>a. Homelett Lettings LTD reserves the right to retrieve the Meter at any time, without prior notice or liability to the User. The Homelett lettingd LTD bears no responsibility for any consequences arising from the retrieval of the Meter, including but not limited to loss of electricity supply, damages, or inconveniences suffered by the User. The User is responsible for making adequate arrangements for alternative electricity sources in case the Meter is retrieved.</div>
                    <div>b. Users must not tamper with, damage, or attempt to modify the Meter in any way.</div>
                    <div>c. Unauthorized removal, relocation, or resale of the Meter is strictly prohibited.</div>
                </div>
            );
        case 5:
            return (
                <div className="space-y-2">
                    <div>a. Users must comply with all applicable electricity regulations and usage guidelines.</div>
                    <div>b. Users must report any issues, malfunctions, or suspected tampering with the Meter immediately to Homelett Lettings LTD customer support.</div>
                    <div>c. Any unauthorized modifications or attempts to bypass the Meter may result in penalties, including disconnection.</div>
                    <div>d. If a User is found to have tampered with the Meter, they agree to pay a fixed reconciliation sum of 200,000 Naira (NGN) as well as any cost or liability caused directly or indirectly by the tampering.</div>
                    <div>e. The User expressly grants Homelett Lettings LTD the right to seek and obtain a court order authorizing the direct debit of any bank account held by the User in Nigeria to recover the penalty amount and any associated costs resulting from Meter tampering. The User waives any right to contest such an order once tampering has been proven.</div>
                </div>
            );
        case 6:
            return (
                <div className="space-y-2">
                    <div>a. Homelett Lettings LTD shall not be liable for any losses, damages, or inconveniences resulting from power outages, Meter malfunctions, or credit depletion.</div>
                    <div>b. The Provider is not responsible for fluctuations or interruptions in electricity supply from PHCN or any third-party supplier.</div>
                </div>
            );
        case 7:
            return (
                <div>
                    Homelett Lettings LTD reserves the right to modify this Agreement at any time. Users will be notified of any significant changes via [Company Website/Email/SMS]. Continued use of the Meter constitutes acceptance of the updated terms.
                </div>
            );
        case 8:
            return (
                <div className="space-y-2">
                    <div>For inquiries, complaints, or technical support, Users may contact Homelett Lettings LTD at:</div>
                    <div className="pl-4">
                        <strong>Email:</strong> hello@homelett.co
                    </div>
                </div>
            );
    }
    return <></>;
}; 