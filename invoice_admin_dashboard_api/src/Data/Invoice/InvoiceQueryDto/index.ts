import { IPagination } from "../../Pagination/IPagaination";

export interface InvoiceQueryDto extends IPagination {
    invoiceNumber?: string;
    referenceMonth?:string;
    minValueDue?: number | undefined;
    maxValueDue?: number | undefined;
    minConsumptionKwh?: number | undefined;
    maxConsumptionKwh?: number | undefined;
    expirationDateStart?: string;
    expirationDateEnd?: string;
  }