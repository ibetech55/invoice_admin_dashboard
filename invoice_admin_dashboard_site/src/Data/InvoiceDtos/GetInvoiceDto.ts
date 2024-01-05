import { AccountFineDto, AccountTaxDto, EnergyDto } from "../InvoiceValuesDtos/EnergyDto";
import { ConsumptionHistoryDto } from "./ConsumtionHistoryDto";

export interface GetInvoiceDto {
    id: number;
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
    subclass: string;
    modualityTax: string;
    lastReadDate: string;
    currentReadDate: string;
    numberDays: number;
    nextReadDate: string;
    measurementType: string;
    measurement: string;
    lastReadValue: number;
    currentReadValue: number;
    multiplicationConstant: number;
    consumptionkwh: number;
    qrCode: string;
    currentAccountGeneration: number;
    client: {
      id: number;
      name: string;
      streetAddress: string;
      zipCode: string;
      taxIdentifier: string;
      stateInscription: string;
      city: string;
      state: string;
      type: string;
    };
    consumptionHistory: ConsumptionHistoryDto[]
    invoiceValues: {
      id: number;
      contribLlumPublicMunicipalVal: number;
      bonusItaipuVal: number;
      electricEnergy: EnergyDto;
      energyScee: EnergyDto;
      energyCompensated: EnergyDto;
      accountFine:AccountFineDto;
      accountTax: AccountTaxDto;
      accountCorrection: AccountTaxDto;
    };
    createdAt: string;
  }