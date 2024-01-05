import { Router } from "express";
import { createInvoiceController } from "../Containers/Invoice/CreateInvoice";
import { getInvoicesController } from "../Containers/Invoice/GetInvoices";
import { getInvoiceByIdController } from "../Containers/Invoice/GetInvoiceById";
import { getInvoiceTotalValuesController } from "../Containers/Invoice/GetInvoiceTotalValues";
import { getTotalValueDueReferenceMonthController } from "../Containers/Invoice/GetTotalValueDueReferenceMonthController";

const invoiceRoutes = Router();
invoiceRoutes.post("/invoice", (req, res) => createInvoiceController.handle(req, res));
invoiceRoutes.get("/invoice", (req, res) => getInvoicesController.handle(req, res));
invoiceRoutes.get("/invoice/getById/:id", (req, res) => getInvoiceByIdController.handle(req, res));
invoiceRoutes.get("/invoice/getInvoiceTotalValues", (req, res) => getInvoiceTotalValuesController.handle(req, res));
invoiceRoutes.get("/invoice/getTotalValueDueReferenceMonth", (req, res) => getTotalValueDueReferenceMonthController.handle(req, res));

export { invoiceRoutes };