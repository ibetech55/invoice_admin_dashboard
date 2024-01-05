import { GetTotalValueDueReferenceMonthDto } from "../../Data/InvoiceDtos/GetTotalValueDueReferenceMonthDto";
import { GetInvoicesDataDto } from "../../Data/InvoiceDtos/GetInvoicesDto";
import { GetInvoiceDto } from "../../Data/InvoiceDtos/GetInvoiceDto";

export interface InvoiceValuesState {
  invoices: GetInvoicesDataDto[];
  totalValuesDueReferenceMonth: GetTotalValueDueReferenceMonthDto[],
  totalInvoices: number;
  totalValueDue: number;
  avgValueDue: number;
  totalConsumptionKwh: number;
  avgConsumptionKwh: number;
  loading: boolean;
  error: string;
  invoice: GetInvoiceDto;
  uploadError: boolean;
}

export const initialState: InvoiceValuesState = {
  uploadError: false,
  invoices: [],
  totalValuesDueReferenceMonth:[],
  totalInvoices: 0,
  totalValueDue: 0,
  loading: false,
  error: "",
  avgValueDue: 0,
  totalConsumptionKwh: 0,
  avgConsumptionKwh: 0,
  invoice: {
    id: 0,
    instalationNumber: "",
    referenceMonth: "",
    expirationDate: "",
    valueDue: 0,
    invoiceNumber: "",
    serie: 0,
    emissionDate: "",
    accessKey: "",
    authorizationProtocol: "",
    invoiceCreatedAt: "",
    class: "",
    subclass: "",
    modualityTax: "",
    lastReadDate: "",
    currentReadDate: "",
    numberDays: 0,
    nextReadDate: "",
    measurementType: "",
    measurement: "",
    lastReadValue: 0,
    currentReadValue: 0,
    multiplicationConstant: 0,
    consumptionkwh: 0,
    qrCode: "",
    currentAccountGeneration: 0,
    client: {
      id: 0,
      name: "",
      streetAddress: "",
      zipCode: "",
      taxIdentifier: "",
      stateInscription: "",
      city: "",
      state: "",
      type: ""
    },
    consumptionHistory: [],
    invoiceValues: {
      id: 0,
      contribLlumPublicMunicipalVal: 0,
      bonusItaipuVal: 0,
      electricEnergy: {
        id: 0,
        quantity: 0,
        unitPrice: 0,
        value: 0,
        unitTax: 0
      },
      energyScee: {
        id: 0,
        quantity: 0,
        unitPrice: 0,
        value: 0,
        unitTax: 0
      },
      energyCompensated: {
        id: 0,
        quantity: 0,
        unitPrice: 0,
        value: 0,
        unitTax: 0
      },
      accountFine: {
        id: 0,
        accountMonth: "",
        accountValue: 0
      },
      accountTax: {
        id: 0,
        accountMonth: "",
        accountValue: 0,
        accountDatePaid: ""
      },
      accountCorrection: {
        id: 0,
        accountMonth: "",
        accountValue: 0,
        accountDatePaid: ""
      }
    },
    createdAt: ""
  }
};
