import { CreateInvoiceDto } from "../../Data/Invoice/CreateInvoiceDtos";
import { IGetInvoice } from "../../Data/Invoice/GetInvoice";
import { IGetInvoices, InvoiceQueryDto } from "../../Data/Invoice/GetInvoicesDto";
import { IGetInvoiceTotalValues } from "../../Data/Invoice/GetTotalValueDueDto";
import { IGetTotalValueDueReferenceMonth } from "../../Data/Invoice/GetTotalValueDueReferenceMonth";

export interface IInvoiceRepository {
  create(values: CreateInvoiceDto)
  find(query:InvoiceQueryDto):Promise<IGetInvoices>
  findById(id: number):Promise<IGetInvoice>
  getInvoiceTotalValues(query:InvoiceQueryDto): Promise<IGetInvoiceTotalValues>
  getTotalValueDueRefernceMonth(query:InvoiceQueryDto):Promise<IGetTotalValueDueReferenceMonth[]>
}
