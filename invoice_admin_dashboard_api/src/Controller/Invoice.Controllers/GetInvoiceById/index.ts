import { Request, Response } from "express";
import { GetInvoicesUseCase } from "../../../Presentation/Invoice/GetInvoices";
import { GetInvoiceByIdUseCase } from "../../../Presentation/Invoice/GetInvoiceById";

export class GetInvoiceByIdController {
    private readonly _getInvoiceByIdUseCase: GetInvoiceByIdUseCase;
    constructor(getInvoiceByIdUseCase: GetInvoiceByIdUseCase) {
        this._getInvoiceByIdUseCase = getInvoiceByIdUseCase;
    }

    async handle(request:Request, response:Response) {
        const data = await this._getInvoiceByIdUseCase.execute(Number(request.params.id));
        return response.status(201).json(data);
    }
}