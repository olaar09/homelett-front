import { IAuthRequest } from "@/app/interfaces/IRegisterRequest"
import { getSectionContent, getSectionTitle } from "./license-agreement-utils"


interface LicenseAgreementContentProps {
    currentUser: IAuthRequest
    invite?: any // Update this type based on your invite interface
}

export function LicenseAgreementContent({ currentUser, invite }: LicenseAgreementContentProps) {
    const currentDate = new Date(invite?.invite.license_start).toLocaleDateString()

    return (
        <div className="space-y-6">
            <div className="text-left font-semibold">
                LICENSE AGREEMENT FOR OCCUPANCY
            </div>

            <div>
                This License Agreement ("Agreement") is made and entered into on this day: {currentDate}, by and between:
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
                            {getSectionContent(currentUser!, invite!, section)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// Helper functions moved to a separate file

