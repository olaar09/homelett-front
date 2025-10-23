// Basic interfaces for contract signing functionality
export interface ContractData {
  status: string;
  generated_path: string;
  tenant_signature: string;
  tenant_name: string;
  house_name: string;
  notice_type?: string;
}

export interface ContractResponse {
  status: string;
  data: ContractData;
}
