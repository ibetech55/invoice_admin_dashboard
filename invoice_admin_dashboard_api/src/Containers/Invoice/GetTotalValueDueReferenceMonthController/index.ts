import { GetTotalValueDueReferenceMonthController } from "../../../Controller/Invoice.Controllers/GetTotalValueDueReferenceMonth";
import { GetTotalValueDueReferenceMonthUseCase } from "../../../Presentation/Invoice/GetTotalValueDueReferenceMonthUseCase";
import { InvoiceRepository } from "../../../Repository/invoice.repsository";

const invoiceRepository = new InvoiceRepository();
const getTotalValueDueReferenceMonthUseCase = new GetTotalValueDueReferenceMonthUseCase(invoiceRepository);
const getTotalValueDueReferenceMonthController = new GetTotalValueDueReferenceMonthController(getTotalValueDueReferenceMonthUseCase);

export { getTotalValueDueReferenceMonthUseCase, getTotalValueDueReferenceMonthController };
