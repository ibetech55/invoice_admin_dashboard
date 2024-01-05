export interface ConsumptionHistoryDto {
    id: number;
    monthYear: string;
    consumptionKwh: number;
    measurementKwhPerDay: number;
    days: number;
    index: number;
}