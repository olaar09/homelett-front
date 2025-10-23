// Basic interfaces for contract signing functionality
export interface ContractData {
    status: string;
    generated_path: string;
    tenant_signature: string;
}

export interface ContractResponse {
    status: string;
    data: ContractData;
}
