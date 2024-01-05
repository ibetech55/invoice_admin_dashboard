import { GetTotalEnergyValuesController } from "../../../Controller/InvoiceValues.Controllers/GetTotalEnergyValues";
import { GetTotalEnergyValuesUseCase } from "../../../Presentation/InvoiceValues/GetTotalEnergyValuesUseCase";
import { InvoiceValuesRepository } from "../../../Repository/invoice.values.repository";


const invoiceValuesRepository = new InvoiceValuesRepository();
const getTotalEnergyValuesUseCase = new GetTotalEnergyValuesUseCase(invoiceValuesRepository);
const getTotalEnergyValuesController = new GetTotalEnergyValuesController(getTotalEnergyValuesUseCase);

export { getTotalEnergyValuesUseCase, getTotalEnergyValuesController };
