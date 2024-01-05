import { InvoiceQueryDto } from "../../../Data/Invoice/GetInvoicesDto";
import { GetInvoiceTotalValues, IGetInvoiceTotalValues } from "../../../Data/Invoice/GetTotalValueDueDto";
import { IInvoiceRepository } from "../../../Repository/invoice.repsository/IInvoice.repository";


export class GetInvoiceTotalValuesUseCase {
  private readonly _invoiceRepository: IInvoiceRepository;

  constructor(invoiceRepository: IInvoiceRepository) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(query:InvoiceQueryDto):Promise<GetInvoiceTotalValues> {
    const data: IGetInvoiceTotalValues =
      await this._invoiceRepository.getInvoiceTotalValues(query);
    const value: GetInvoiceTotalValues = {
      totalValueDue: Number(data.total_value_due),
      avgValueDue: Number(data.avg_value_due),
      totalConsumptionKwh: Number(data.total_consumption_kwh),
      avgConsumptionKwh: Number(data.avg_consumption_kwh),
    };
    return value;
  }
}
