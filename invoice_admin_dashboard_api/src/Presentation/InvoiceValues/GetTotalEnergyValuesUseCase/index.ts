import {
  GetEnergyTotalValuesDto,
  IGetEnergyTotalValues,
} from "../../../Data/InvoiceValues/GetEnergyTotalValuesDto";
import { IInvoiceValuesRepository } from "../../../Repository/invoice.values.repository/IInvoiceValues.repository";

export class GetTotalEnergyValuesUseCase {
  private readonly _repository: IInvoiceValuesRepository;
  constructor(repository: IInvoiceValuesRepository) {
    this._repository = repository;
  }

  async execute(): Promise<GetEnergyTotalValuesDto> {
    const data: IGetEnergyTotalValues =
      await this._repository.getTotalEnergyValues();
    const values: GetEnergyTotalValuesDto = {
      electricEnergyTotalValue: Number(data.electric_energy_total_value),
      electricEnergyAvgValue: Number(data.electric_energy_avg_value),
      energySceeTotalValue: Number(data.energy_scee_total_value),
      energySceeAvgValue: Number(data.energy_scee_avg_value),
      energyCompensatedTotalValue: Number(data.energy_compensated_total_value),
      energyCompensatedAvgValue: Number(data.energy_compensated_avg_value),
      contribLlumTotalValue: Number(data.contrib_llum_total_value),
      contribLlumAvgValue: Number(data.contrib_llum_avg_value),
      bonusItaipuAvgValue: Number(data.bonus_itaipu_avg_value),
      bonusItaipuTotalValue: Number(data.bonus_itaipu_total_value),
      accountFineTotalValue: Number(data.account_fine_total_value),
      accountFineAvgValue: Number(data.account_fine_avg_value),
      accountTaxTotalValue: Number(data.account_tax_total_value),
      accountTaxAvgValue: Number(data.account_tax_avg_value),
      accountCorrectionTotalValue: Number(data.account_correction_total_value),
      accountCorrectionAvgValue: Number(data.account_correction_avg_value),
  
    };
    return values;
  }
}
