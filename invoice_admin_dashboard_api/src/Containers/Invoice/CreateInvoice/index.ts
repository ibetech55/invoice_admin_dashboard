import { CreateInvoiceController } from "../../../Controller/Invoice.Controllers/CreateInvoice";
import { CreateInvoiceUseCase } from "../../../Presentation/Invoice/CreateInvoiceUseCase";
import { GetPDFData } from "../../../Presentation/Invoice/CreateInvoiceUseCase/GetPdfData";
import { InvoiceRepository } from "../../../Repository/invoice.repsository";

const invoiceRepository = new InvoiceRepository();
const getPdfData = new GetPDFData();
const createInvoiceUseCase = new CreateInvoiceUseCase(invoiceRepository, getPdfData);
const createInvoiceController = new CreateInvoiceController(
  createInvoiceUseCase
);

export { createInvoiceUseCase, createInvoiceController };
