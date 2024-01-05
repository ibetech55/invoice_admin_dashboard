import { CreateClientDto } from "../ClientDtos";
import { CreateConsumptionHistoryDto } from "../ConsumptionHistoryDto";
import { CreateInvoiceValuesDto } from "../ValueInvoicesDto";


export interface CreateInvoiceDto {
    instalationNumber: string;
    referenceMonth: string;
    expirationDate: string;
    valueDue: number;
    invoiceNumber: string;
    serie: number;
    emissionDate: string;
    accessKey: string;
    authorizationProtocol: string;
    invoiceCreatedAt: string;
    class: string;
    subClass: string;
    modulaityTax: string;
    lastReadDate: string;
    currentReadDate: string;
    numberDays: number;
    nextReadDate: string;
    measurementType: string;
    measurement: string;
    lastReadValue: number;
    currentReadValue: number;
    multiplicationConstant:number;
    consumptionKwh: number;
    qrCode: string;
    currentAccountGeneration: number;
    consumptionHistory: CreateConsumptionHistoryDto[];
    client: CreateClientDto;
    invoiceValues: CreateInvoiceValuesDto;
  }