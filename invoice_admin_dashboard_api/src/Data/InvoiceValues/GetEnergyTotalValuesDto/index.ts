import { Decimal } from "@prisma/client/runtime/library";

export interface IGetEnergyTotalValues {
  electric_energy_total_value: Decimal;
  electric_energy_avg_value: Decimal;
  energy_scee_total_value: Decimal;
  energy_scee_avg_value: Decimal;
  energy_compensated_total_value: Decimal;
  energy_compensated_avg_value: Decimal;
  contrib_llum_total_value: Decimal;
  contrib_llum_avg_value: Decimal;
  bonus_itaipu_total_value: Decimal;
  bonus_itaipu_avg_value: Decimal;
  account_fine_avg_value: Decimal;
  account_fine_total_value: Decimal;
  account_tax_avg_value: Decimal;
  account_tax_total_value: Decimal;
  account_correction_avg_value: Decimal;
  account_correction_total_value: Decimal;
}

export interface GetEnergyTotalValuesDto {
  electricEnergyTotalValue: number;
  electricEnergyAvgValue: number;
  energySceeTotalValue: number;
  energySceeAvgValue: number;
  energyCompensatedTotalValue: number;
  energyCompensatedAvgValue: number;
  contribLlumTotalValue: number;
  contribLlumAvgValue: number;
  bonusItaipuTotalValue: number;
  bonusItaipuAvgValue: number;
  accountFineAvgValue: number;
  accountFineTotalValue: number;
  accountTaxAvgValue: number;
  accountTaxTotalValue: number;
  accountCorrectionAvgValue: number;
  accountCorrectionTotalValue: number;
}
