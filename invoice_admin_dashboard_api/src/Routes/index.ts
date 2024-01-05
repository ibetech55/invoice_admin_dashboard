import { Router } from "express";
import { invoiceRoutes } from "./invoice.routes";
import { invoiceValuesRoutes } from "./invoiceValues.routes";
import { clientRoutes } from "./client.routes";

const apiRoutes = Router();
apiRoutes.use([invoiceRoutes, invoiceValuesRoutes, clientRoutes])

export { apiRoutes };