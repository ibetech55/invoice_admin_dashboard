import { Request, Response } from "express";
import { GetInvoiceTotalValuesUseCase } from "../../../Presentation/Invoice/GetInvoiceTotalValues";

export class GetInvoiceTotalValuesController {
    private readonly _getInvoiceTotalValuesUseCase: GetInvoiceTotalValuesUseCase;
    constructor(getInvoiceTotalValuesUseCase: GetInvoiceTotalValuesUseCase) {
        this._getInvoiceTotalValuesUseCase = getInvoiceTotalValuesUseCase;
    }

    async handle(request:Request, response:Response) {
        const data = await this._getInvoiceTotalValuesUseCase.execute(request.query);
        return response.status(200).json(data);
    }
}