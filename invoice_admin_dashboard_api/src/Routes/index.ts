import { Router } from "express";
import { invoiceRoutes } from "./invoice.routes";
import { invoiceValuesRoutes } from "./invoiceValues.routes";

const apiRoutes = Router();
apiRoutes.use([invoiceRoutes, invoiceValuesRoutes])

export { apiRoutes };