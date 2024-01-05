import { Router } from "express";
import { getTotalEnergyValuesController } from "../Containers/InvoiceValues/GetTotalEnergyValues";


const invoiceValuesRoutes = Router();
invoiceValuesRoutes.get("/invoiceValues/totalEnergyValues", (req, res) => getTotalEnergyValuesController.handle(req, res));

export { invoiceValuesRoutes };