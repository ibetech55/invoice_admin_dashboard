import { InvoiceQueryDto } from "../../../Data/Invoice/GetInvoicesDto";
import { GetInvoiceTotalValues, IGetInvoiceTotalValues } from "../../../Data/Invoice/GetTotalValueDueDto";
import { GetTotalValueDueReferenceMonthDto, IGetTotalValueDueReferenceMonth } from "../../../Data/Invoice/GetTotalValueDueReferenceMonth";
import { IInvoiceRepository } from "../../../Repository/invoice.repsository/IInvoice.repository";
import { formatToIsoDate } from "../../../Utils/FormatToIsoDate";


export class GetTotalValueDueReferenceMonthUseCase {
  private readonly _invoiceRepository: IInvoiceRepository;

  constructor(invoiceRepository: IInvoiceRepository) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(query:InvoiceQueryDto):Promise<GetTotalValueDueReferenceMonthDto[]> {
    const data: IGetTotalValueDueReferenceMonth[] =
      await this._invoiceRepository.getTotalValueDueRefernceMonth(query);
    const values: GetTotalValueDueReferenceMonthDto[] = data.map((x:IGetTotalValueDueReferenceMonth)=>({
      referenceMonth: formatToIsoDate(x.reference_month),
      totalValueDueReferenceMonth: Number(x.total_value_due_reference_month)
    }))
    return values;
  }
}
