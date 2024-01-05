import { CreateConsumptionHistoryExtractDto } from "../ConsumptionHistoryDto";

export interface ICreateClientData {
    name: string;
    streetAddress: string;
    zipCode: string;
    taxIdentifier: string;
    stateInscription: string;
    city: string;
    state: string;
    type: string;
  }
  
  export interface IReferenceData {
    refernceMonth: string;
    expirationDate: string;
    valueDue: number;
  }
  export interface IReadDates {
    nextRead: string;
    days: number;
    anterior: string;
    current: string;
  }
  
  export interface IEnergyData {
    quantity: number;
    unitPrice: number;
    value: number;
    unitTax: number;
  }
  export interface IAccountTaxData {
    accountMonth: string;
    accountDatePaid: string;
    accountValue: number;
  }
  
  export interface IAccountCorrectionData {
    accountMonth: string;
    accountDatePaid: string;
    accountValue: number;
  }
  
  export interface IAccountFineData {
    accountMonth: string;
    accountValue: number;
  }
  export interface IInvoiceValuesData {
    electricEnergy: IEnergyData;
    energiaScee: IEnergyData;
    energiaCompensated: IEnergyData;
    contribLlum: number;
    bonusItapiu: number;
    accountFine: IAccountFineData;
    accountTax: IAccountTaxData;
    accountCorrection: IAccountCorrectionData;
  }
  
  export interface ITechInfoData {
    measurementType: string;
    measurement: string;
    lastRead: number;
    currentRead: number;
    multiplicationConstatnt: number;
    consumptionKwh: number;
  }
  export interface IInvoiceData {
    consumptionHistory: CreateConsumptionHistoryExtractDto[];
    clientNumber: string;
    instalationNumber: string;
    currentAccountGeneration: number;
    client: ICreateClientData;
    referenceData: IReferenceData;
    invoiceNumber: string;
    serie: number;
    emissionDate: string;
    accessKey: string;
    authorizationProtocol: string;
    invoiceCreatedAt: string;
    qrCode: string;
    automaticDebitCode: string;
    readDates: IReadDates;
    invoiceValues: IInvoiceValuesData;
    tecInfo: ITechInfoData;
    modualityTax: string;
    class: string;
    subclass: string;
  }