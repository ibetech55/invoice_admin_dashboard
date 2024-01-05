import dayjs from "dayjs";
import { IPagination } from "../IPagination";

export interface InvoiceFilterDto extends IPagination {
  invoiceNumber?: string;
  referenceMonthDate?: dayjs.Dayjs  | null;
  referenceMonth?:string;
  minValueDue?: number | undefined;
  maxValueDue?: number | undefined;
  minConsumptionKwh?: number | undefined;
  maxConsumptionKwh?: number | undefined;
  expirationDateStart?: string;
  expirationDateEnd?: string;
  expirationDateData?: [dayjs.Dayjs, dayjs.Dayjs] | null;
}

export interface InvoiceParamsDto extends IPagination {
  invoiceNumber?: string;
  referenceMonth?:string;
  minValueDue?: number | undefined;
  maxValueDue?: number | undefined;
  minConsumptionKwh?: number | undefined;
  maxConsumptionKwh?: number | undefined;
  expirationDateStart?: string;
  expirationDateEnd?: string;
}