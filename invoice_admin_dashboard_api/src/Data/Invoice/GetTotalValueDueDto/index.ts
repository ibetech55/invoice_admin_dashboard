import { Decimal } from "@prisma/client/runtime/library";

export interface IGetInvoiceTotalValues {
  total_value_due: Decimal;
  avg_value_due: Decimal;
  total_consumption_kwh: number;
  avg_consumption_kwh: number;
}

export interface GetInvoiceTotalValues {
  totalValueDue: number;
  avgValueDue: number;
  totalConsumptionKwh: number;
  avgConsumptionKwh: number;
}
