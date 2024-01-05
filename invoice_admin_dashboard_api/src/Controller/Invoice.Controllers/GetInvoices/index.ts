import { Request, Response } from "express";
import { GetInvoicesUseCase } from "../../../Presentation/Invoice/GetInvoices";

export class GetInvoicesController {
    private readonly _getInvoiceUseCase: GetInvoicesUseCase;
    constructor(getInvoiceUseCase: GetInvoicesUseCase) {
        this._getInvoiceUseCase = getInvoiceUseCase;
    }

    async handle(request:Request, response:Response) {
        const data = await this._getInvoiceUseCase.execute(request.query);
        return response.status(201).json(data);
    }
}