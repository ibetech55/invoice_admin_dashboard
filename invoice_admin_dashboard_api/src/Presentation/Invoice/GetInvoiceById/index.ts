import { GetInvoiceDto, IGetInvoice } from "../../../Data/Invoice/GetInvoice";
import { IInvoiceRepository } from "../../../Repository/invoice.repsository/IInvoice.repository";
import { formatMonthYear } from "../../../Utils/FormatMonthYear";
import { formatToIsoDate } from "../../../Utils/FormatToIsoDate";

export class GetInvoiceByIdUseCase {
  private readonly _invoiceRepository: IInvoiceRepository;

  constructor(invoiceRepository: IInvoiceRepository) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(id: number) {
    const data: IGetInvoice = await this._invoiceRepository.findById(id);

    let values: GetInvoiceDto = {
      id: data.id,
      instalationNumber: data.instalation_number,
      referenceMonth: formatMonthYear(data.reference_month),
      expirationDate: formatToIsoDate(data.expiration_date),
      valueDue: Number(data.value_due),
      invoiceNumber: data.invoice_number,
      serie: data.serie,
      emissionDate: formatToIsoDate(data.emission_date) ,
      accessKey: data.access_key,
      authorizationProtocol: data.authorization_protocol,
      invoiceCreatedAt: formatToIsoDate(data.invoice_created_at),
      class: data.class,
      subclass: data.subclass,
      modualityTax: data.moduality_tax,
      lastReadDate: formatToIsoDate(data.last_read_date),
      currentReadDate: formatToIsoDate(data.current_read_date),
      numberDays: data.number_days,
      nextReadDate: formatToIsoDate(data.next_read_date),
      measurementType: data.measurement_type,
      measurement: data.measurement,
      lastReadValue: Number(data.last_read_value),
      currentReadValue: Number(data.current_read_value),
      multiplicationConstant: data.multiplication_constant,
      consumptionkwh: data.consumption_kwh,
      qrCode: data.qr_code,
      currentAccountGeneration: Number(data.current_account_generation),
      client: {
        id: data.client.id,
        name: data.client.name,
        streetAddress: data.client.street_address,
        zipCode: data.client.zip_code,
        taxIdentifier: data.client.tax_identifier,
        stateInscription: data.client.state_inscription,
        city: data.client.city,
        state: data.client.state,
        type: data.client.type,
      },
      consumptionHistory: data.consumption_history.map((x) => ({
        id: x.id,
        monthYear: x.month_year,
        consumptionKwh: Number(x.consumption_kwh),
        measurementKwhPerDay: Number(x.measurement_kwh_per_day),
        days: x.days,
        index: x.index,
      })),
      invoiceValues: {
        id: data.invoice_values.id,
        contribLlumPublicMunicipalVal:
          data.invoice_values.contrib_llum_public_municipal_val,
        bonusItaipuVal: data.invoice_values.bonus_itaipu_val,
        electricEnergy: {
          id: data.invoice_values.electric_energy.id,
          quantity: data.invoice_values.electric_energy.quantity,
          unitPrice: Number(data.invoice_values.electric_energy.unit_price),
          value: Number(data.invoice_values.electric_energy.value),
          unitTax: Number(data.invoice_values.electric_energy.unit_tax),
        },
        energyScee: {
          id: data.invoice_values.energy_scee.id,
          quantity: data.invoice_values.energy_scee.quantity,
          unitPrice: Number(data.invoice_values.energy_scee.unit_price),
            value: Number(data.invoice_values.energy_scee.value),
              unitTax: Number(data.invoice_values.energy_scee.unit_tax),
        },
        energyCompensated: {
          id: data.invoice_values.energy_compensated.id,
          quantity: data.invoice_values.energy_compensated.quantity,
          unitPrice: Number(data.invoice_values.energy_compensated.unit_price),
          value: Number(data.invoice_values.energy_compensated.value),
          unitTax: Number(data.invoice_values.energy_compensated.unit_tax),
        },
        accountFine: data.invoice_values.account_fine ? {
          id: data.invoice_values.account_fine.id,
          accountMonth: formatToIsoDate(data.invoice_values.account_fine.account_month),
          accountValue: Number(data.invoice_values.account_fine.account_value),
        } : null,
        accountTax: data.invoice_values.account_tax ? {
          id: data.invoice_values.account_tax.id,
          accountMonth: formatToIsoDate(data.invoice_values.account_tax.account_month),
          accountValue: Number(data.invoice_values.account_tax.account_value),
          accountDatePaid: formatToIsoDate(data.invoice_values.account_tax.account_date_paid),
        } : null,
        accountCorrection: data.invoice_values.account_correction ? {
          id: data.invoice_values.account_correction.id,
          accountMonth: formatToIsoDate(data.invoice_values.account_correction.account_month),
          accountValue: Number(data.invoice_values.account_correction.account_value),
          accountDatePaid: formatToIsoDate(data.invoice_values.account_correction.account_date_paid),
        } : null,
      },
      createdAt: formatToIsoDate(data.created_at),
    };
    return values;
  }
}
