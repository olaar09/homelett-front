import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RegisterFormData } from "@/app/interfaces/IRegister"
import { IHouse } from "@/app/interfaces/IHouse"
import { User, Phone, Mail, UserPlus, Home, MapPin, User2, Map } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

interface SummaryModalProps {
    isOpen: boolean
    onClose: () => void
    house: IHouse
}

export function SummaryModal({ isOpen, onClose, house }: SummaryModalProps) {
    const { currentUser } = useAuth()

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Application Summary</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] px-1">
                    <div className="space-y-6 py-4">
                        {/* House Details */}
                        <div className="space-y-2">
                            <h3 className="font-semibold text-sm text-muted-foreground">House Details</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Home className="h-4 w-4 text-primary" />
                                    <span>{house.house_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    <span>{house.address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="space-y-2">
                            <h3 className="font-semibold text-sm text-muted-foreground">Personal Information</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-primary" />
                                    <span>{currentUser?.first_name} {currentUser?.last_name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-primary" />
                                    <span>{currentUser?.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-primary" />
                                    <span>{currentUser?.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Next of Kin */}
                        {currentUser?.next_of_kin?.kin_name && (
                            <div className="space-y-2">
                                <h3 className="font-semibold text-sm text-muted-foreground">Next of Kin</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <UserPlus className="h-4 w-4 text-primary" />
                                        <span>{currentUser?.next_of_kin?.kin_name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-primary" />
                                        <span>{currentUser?.next_of_kin?.kin_phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Map className="h-4 w-4 text-primary" />
                                        <span>{currentUser?.next_of_kin?.kin_address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User2 className="h-4 w-4 text-primary" />
                                        <span>{currentUser?.next_of_kin?.kin_relationship}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentUser?.kyc?.nin && (
                            <div className="space-y-2">
                                <h3 className="font-semibold text-sm text-muted-foreground">Next of Kin</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <UserPlus className="h-4 w-4 text-primary" />
                                        <span>{currentUser?.kyc?.nin}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-primary" />
                                        <span>{currentUser?.kyc?.current_address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Map className="h-4 w-4 text-primary" />
                                        <span>{currentUser?.kyc?.work_address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User2 className="h-4 w-4 text-primary" />
                                        <span>{currentUser?.kyc?.occupation}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
} 