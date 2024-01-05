import { GetInvoiceTotalValuesController } from "../../../Controller/Invoice.Controllers/GetInvoiceTotalValues";
import { GetInvoiceTotalValuesUseCase } from "../../../Presentation/Invoice/GetInvoiceTotalValues";
import { InvoiceRepository } from "../../../Repository/invoice.repsository";

const invoiceRepository = new InvoiceRepository();
const getInvoiceTotalValuesUseCase = new GetInvoiceTotalValuesUseCase(invoiceRepository);
const getInvoiceTotalValuesController = new GetInvoiceTotalValuesController(getInvoiceTotalValuesUseCase);

export { getInvoiceTotalValuesUseCase, getInvoiceTotalValuesController };
