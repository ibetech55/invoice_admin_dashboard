export interface InvoiceValuesState {
  electricEnergyTotalValue: number;
  electricEnergyAvgValue: number;
  energySceeTotalValue: number;
  energySceeAvgValue: number;
  energyCompensatedTotalValue: number;
  energyCompensatedAvgValue: number;
  contribLlumTotalValue: number;
  contribLlumAvgValue: number;
  bonusItaipuAvgValue: number;
  bonusItaipuTotalValue: number;
  accountFineAvgValue: number;
  accountFineTotalValue: number;
  accountTaxAvgValue: number;
  accountTaxTotalValue: number;
  accountCorrectionAvgValue: number;
  accountCorrectionTotalValue: number;
  loading: boolean;
  error: string;
}

export const initialState: InvoiceValuesState = {
  electricEnergyTotalValue: 0,
  electricEnergyAvgValue: 0,
  energySceeTotalValue: 0,
  energySceeAvgValue: 0,
  energyCompensatedTotalValue: 0,
  energyCompensatedAvgValue: 0,
  contribLlumTotalValue: 0,
  contribLlumAvgValue: 0,
  loading: false,
  error: "",
  bonusItaipuAvgValue: 0,
  bonusItaipuTotalValue: 0,
  accountFineAvgValue: 0,
  accountFineTotalValue: 0,
  accountTaxAvgValue: 0,
  accountTaxTotalValue: 0,
  accountCorrectionAvgValue: 0,
  accountCorrectionTotalValue: 0
};
