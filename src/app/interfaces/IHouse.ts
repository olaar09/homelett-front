export interface IHouse {
    id: any
    house_code: string
    house_name: string
    contact_phone: string
    contact_person_name: string
    token_per_kw: number
    user_id: number
    account_name: string
    bank_account: string
    bank_name: string
    contact_email: string
    slug: string
    address: string
    modules: IModule[]
    surcharge?: number;
    deposit_surcharge?: number;
    token_surcharge?: number;
    service_charge?: number;
    is_meter_financed?: number;
}

export interface IModule {
    id: number
    name: string
    description: string
    icon?: string
}
