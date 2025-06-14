import { IAuthRequest } from "@/app/interfaces/IRegisterRequest"
import { getSectionContent, getSectionTitle } from "./service-agreement-utils"

interface ServiceAgreementContentProps {
    currentUser: IAuthRequest
}

export function ServiceAgreementContent({ currentUser }: ServiceAgreementContentProps) {
    return (
        <div className="space-y-6 text-[0.78rem]">
            <div className="font-semibold">
                SERVICE LEVEL AGREEMENT (SLA) FOR THE USE OF PREPAID METER
            </div>

            <div className="space-y-2">
                <div className="font-semibold">BETWEEN</div>
                <div>
                    {currentUser?.first_name} {currentUser?.last_name} ("User") residing at {currentUser?.house?.address}
                </div>
                <div className="font-semibold">AND</div>
                <div>Homelett Lettings LTD ("Provider")</div>
            </div>

            <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((section) => (
                    <div key={section} className="space-y-2">
                        <div className="font-semibold">{section}. {getSectionTitle(section)}</div>
                        <div className="pl-4">
                            {getSectionContent(currentUser, section)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 