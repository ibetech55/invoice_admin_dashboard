import { Request, Response } from "express";
import { CreateInvoiceUseCase } from "../../../Presentation/Invoice/CreateInvoiceUseCase";

export class CreateInvoiceController {
    private readonly _createInvoiceUseCase: CreateInvoiceUseCase;
    constructor(createInvoiceUseCase: CreateInvoiceUseCase) {
        this._createInvoiceUseCase = createInvoiceUseCase;
    }

    async handle(request:Request, response:Response) {
        const data = await this._createInvoiceUseCase.execute(request.files);
        return response.status(201).json(data);
    }
}