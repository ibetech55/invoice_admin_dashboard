import { GetInvoiceByIdController } from "../../../Controller/Invoice.Controllers/GetInvoiceById";
import { GetInvoiceByIdUseCase } from "../../../Presentation/Invoice/GetInvoiceById";
import { InvoiceRepository } from "../../../Repository/invoice.repsository";

const invoiceRepository = new InvoiceRepository();
const getInvoiceByIdUseCase = new GetInvoiceByIdUseCase(invoiceRepository);
const getInvoiceByIdController = new GetInvoiceByIdController(getInvoiceByIdUseCase);

export { getInvoiceByIdUseCase, getInvoiceByIdController };
