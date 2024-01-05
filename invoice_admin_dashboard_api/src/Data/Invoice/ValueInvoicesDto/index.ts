export interface EnergyDto {
  quantity: number;
  unitPrice: number;
  unitTax: number;
  value: number;
}

export interface AccountTaxDto {
  accountMonth: string;
  accountDatePaid: string;
  accountValue: number;
}

export interface AccountFineDto {
  accountMonth: string;
  accountValue: number;
}

export interface AccountCorrectionDto {
  accountMonth: string;
  accountDatePaid: string;
  accountValue: number;
}

export interface CreateInvoiceValuesDto {
  electricEnergy: EnergyDto;
  energyScee: EnergyDto;
  energyCompensated: EnergyDto;
  contribLlumPublicMunicipalVal: number;
  accountFine: AccountFineDto;
  accountTax: AccountTaxDto;
  accountCorrection: AccountCorrectionDto;
  bonusItaipu: number;
}
