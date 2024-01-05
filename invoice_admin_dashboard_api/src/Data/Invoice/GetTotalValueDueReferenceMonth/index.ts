import { Decimal } from "@prisma/client/runtime/library";

export interface IGetTotalValueDueReferenceMonth {
    reference_month: Date;
    total_value_due_reference_month: Decimal;
}

export interface GetTotalValueDueReferenceMonthDto {
    referenceMonth: string;
    totalValueDueReferenceMonth: number;
}