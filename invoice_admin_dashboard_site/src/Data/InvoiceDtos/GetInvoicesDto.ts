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

export interface GetInvoicesDto {
  data: GetInvoicesDataDto[];
  total: number;
}
