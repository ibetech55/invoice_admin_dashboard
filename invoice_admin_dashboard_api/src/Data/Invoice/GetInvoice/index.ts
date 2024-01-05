import { Decimal } from "@prisma/client/runtime/library";

export interface IGetInvoice {
  id: number;
  instalation_number: string;
  reference_month: Date;
  expiration_date: Date;
  value_due: Decimal;
  invoice_number: string;
  serie: number;
  emission_date: Date;
  access_key: string;
  authorization_protocol: string;
  invoice_created_at: Date;
  class: string;
  subclass: string;
  moduality_tax: string;
  last_read_date: Date;
  current_read_date: Date;
  number_days: number;
  next_read_date: Date;
  measurement_type: string;
  measurement: string;
  last_read_value: Decimal;
  current_read_value: Decimal;
  multiplication_constant: number;
  consumption_kwh: number;
  qr_code: string;
  current_account_generation: Decimal;
  client: {
    id: number;
    name: string;
    street_address: string;
    zip_code: string;
    tax_identifier: string;
    state_inscription: string;
    city: string;
    state: string;
    type: string;
  };
  consumption_history: {
    id: number;
    month_year: string;
    consumption_kwh: Decimal;
    measurement_kwh_per_day: Decimal;
    days: number;
    index: number;
  }[];
  invoice_values: {
    id: number;
    contrib_llum_public_municipal_val: Decimal;
    bonus_itaipu_val: Decimal;
    electric_energy: {
        id: number;
        quantity: number;
        unit_price: Decimal;
        value: Decimal;
        unit_tax: Decimal;
    };
    energy_scee: {
        id: number;
        quantity: number;
        unit_price: Decimal;
        value: Decimal;
        unit_tax: Decimal;
    };
    energy_compensated: {
        id: number;
        quantity: number;
        unit_price: Decimal;
        value: Decimal;
        unit_tax: Decimal;
    };
    account_fine: {
        id: number;
        account_month: Date;
        account_value: Decimal;
    };
    account_tax: {
        id: number;
        account_month: Date;
        account_value: Decimal;
        account_date_paid: Date;
    };
    account_correction: {
        id: number;
        account_month: Date;
        account_value: Decimal;
        account_date_paid: Date;
    };
  };
  created_at: Date;
}


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
    consumptionHistory: {
      id: number;
      monthYear: string;
      consumptionKwh: number;
      measurementKwhPerDay: number;
      days: number;
      index: number;
    }[];
    invoiceValues: {
      id: number;
      contribLlumPublicMunicipalVal
      bonusItaipuVal
      electricEnergy: {
          id: number;
          quantity: number;
          unitPrice: number;
          value: number;
          unitTax: number;
      };
      energyScee: {
          id: number;
          quantity: number;
          unitPrice: number;
          value: number;
          unitTax: number;
      };
      energyCompensated: {
          id: number;
          quantity: number;
          unitPrice: number;
          value: number;
          unitTax: number;
      };
      accountFine: {
          id: number;
          accountMonth: string;
          accountValue: number;
      };
      accountTax: {
          id: number;
          accountMonth: string;
          accountValue: number;
          accountDatePaid: string;
      };
      accountCorrection: {
          id: number;
          accountMonth: string;
          accountValue: number;
          accountDatePaid: string;
      };
    };
    createdAt: string;
  }
