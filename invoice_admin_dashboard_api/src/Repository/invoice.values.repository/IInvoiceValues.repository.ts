import { IGetEnergyTotalValues } from "../../Data/InvoiceValues/GetEnergyTotalValuesDto";

export interface IInvoiceValuesRepository {
    getTotalEnergyValues(): Promise<IGetEnergyTotalValues>;
  }