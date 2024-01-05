import { Decimal } from "@prisma/client/runtime/library";

export interface GetInvoicesDataDto {
  id: number;
  instalationNumber: string;
  referenceMonth: string;
  expirationDate: string;
  valueDue: number;
  invoiceNumber: string;
  emissionDate: string;
  lastReadDate: string;
  currentReadDate: string;
  lastReadValue: number;
  currentReadValue: number;
  consumptionKwh: number;
  client: {
    id: number;
    name: string;
    streetAddress: string;
    zipCode: string;
    city: string;
    state: string;
    type: string;
  };
  createdAt: string;
}

export interface IGetInvoicesData {
  id: number;
  instalation_number: string;
  reference_month: Date;
  expiration_date: Date;
  value_due: Decimal;
  invoice_number: string;
  emission_date: Date;
  last_read_date: Date;
  current_read_date: Date;
  last_read_value: Decimal;
  current_read_value: Decimal;
  consumption_kwh: number;
  client: {
    id: number;
    name: string;
    street_address: string;
    zip_code: string;
    city: string;
    state: string;
    type: string;
  };
  created_at: Date;
}

export interface IGetInvoices {
  data: IGetInvoicesData[]
  total: number;
}

export interface GetInvoicesDto {
  data: GetInvoicesDataDto[];
  total: number;
}

export interface InvoiceQueryDto {
  invoiceNumber?: string;
  referenceMonth?:string;
  minValueDue?: number | undefined;
  maxValueDue?: number | undefined;
  minConsumptionKwh?: number | undefined;
  maxConsumptionKwh?: number | undefined;
  expirationDateStart?: string;
  expirationDateEnd?: string;
}

