import { GetInvoicesController } from "../../../Controller/Invoice.Controllers/GetInvoices";
import { GetInvoicesUseCase } from "../../../Presentation/Invoice/GetInvoices";
import { InvoiceRepository } from "../../../Repository/invoice.repsository";

const invoiceRepository = new InvoiceRepository();
const getInvoicesUseCase = new GetInvoicesUseCase(invoiceRepository);
const getInvoicesController = new GetInvoicesController(getInvoicesUseCase);

export { getInvoicesUseCase, getInvoicesController };
