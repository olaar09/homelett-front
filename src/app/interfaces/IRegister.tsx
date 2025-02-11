export type RegisterFormData = {
    // Bio Info
    first_name: string
    last_name: string
    email: string
    phone: string
    password: string

    // Contact Details
    currentAddress: string
    previousAddress: string
    city: string
    state: string

    // Next of Kin
    kinName: string
    kinRelationship: string
    kinPhone: string
    kinAddress: string

    // Agreements
    rentAgreement: boolean
    paymentAgreement: boolean
}

export type StepProps = {
    data: RegisterFormData
    onUpdate: (data: Partial<RegisterFormData>) => void
    onNext: () => void
    onPrev: () => void
    house_id?: string
}

