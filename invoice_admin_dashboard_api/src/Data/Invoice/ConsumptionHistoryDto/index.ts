export interface CreateConsumptionHistoryDto {
  monthYear: string;
  consumptionKwh: number;
  measurementKwhPerDay: number;
  days: number;
  index: number;
  invoiceNumber: string;
}

export interface CreateConsumptionHistoryExtractDto {
  monthYear: string;
  consumptionKwh: number;
  measurementKwhPerDay: number;
  days: number;
  index: number;
}
