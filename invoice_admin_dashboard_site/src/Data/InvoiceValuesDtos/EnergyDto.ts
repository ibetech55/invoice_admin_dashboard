export interface EnergyDto {
    id: number;
    quantity: number;
    unitPrice: number;
    value: number;
    unitTax: number;
}

export interface AccountFineDto {
    id: number;
    accountMonth: string;
    accountValue: number;
}

export interface AccountTaxDto {
    id: number;
    accountMonth: string;
    accountValue: number;
    accountDatePaid: string;
}

export interface AccountCorrectionDto {
    id: number;
    accountMonth: string;
    accountValue: number;
    accountDatePaid: string;
}