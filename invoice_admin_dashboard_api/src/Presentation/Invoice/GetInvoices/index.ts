import { DateTime } from "luxon";
import { GetInvoicesDataDto, GetInvoicesDto, IGetInvoices, IGetInvoicesData, InvoiceQueryDto } from "../../../Data/Invoice/GetInvoicesDto";
import { IInvoiceRepository } from "../../../Repository/invoice.repsository/IInvoice.repository";
import { formatToIsoDate } from "../../../Utils/FormatToIsoDate";
import { timestampToIso } from "../../../Utils/TimeStampToTIso";
import { formatMonthYear } from "../../../Utils/FormatMonthYear";

export class GetInvoicesUseCase {
  private readonly _invoiceRepository: IInvoiceRepository;

  constructor(invoiceRepository: IInvoiceRepository) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(query:InvoiceQueryDto): Promise<GetInvoicesDto> {

    const data: IGetInvoices = (await this._invoiceRepository.find(query));
    const values: GetInvoicesDataDto[] = data.data.map((x) => ({
      id: x.id,
      instalationNumber: x.instalation_number,
      referenceMonth: formatToIsoDate(x.reference_month),
      expirationDate: formatToIsoDate(x.expiration_date),
      valueDue: Number(x.value_due),
      invoiceNumber: x.invoice_number,
      emissionDate: formatToIsoDate(x.emission_date),
      lastReadDate: formatToIsoDate(x.last_read_date),
      currentReadDate: formatToIsoDate(x.current_read_date),
      lastReadValue: Number(x.last_read_value),
      currentReadValue: Number(x.current_read_value),
      consumptionKwh: x.consumption_kwh,
      client: {
        id: x.client.id,
        name: x.client.name,
        streetAddress: x.client.street_address,
        zipCode: x.client.zip_code,
        city: x.client.city,
        state: x.client.state,
        type: x.client.type,
      },
      createdAt: timestampToIso(x.created_at),
    }));

    return {
      data: values,
      total:data.total
    };
  }
}
