import { IHouseInvite } from "./IRegisterRequest"

export type RegisterFormData = {
    // Bio Info
    first_name: string
    last_name: string
    email: string
    phone: string
    password: string
    meter_number: string
    // Contact Details
    current_address: string
    work_address: string
    occupation: string
    nin: string

    // Next of Kin
    kin_name: string
    kin_relationship: string
    kin_phone: string
    kin_address: string

    // Agreements
    rent_agreement: boolean
    payment_agreement: boolean
}

export type StepProps = {
    data: RegisterFormData
    onUpdate: (data: Partial<RegisterFormData>, invite_code?: string) => void
    onNext: () => void
    onPrev: () => void
    invite_code?: string
    invite?: IHouseInvite
    house_id?: string
    sku_id?: number
    is_utility_signup?: boolean
}

