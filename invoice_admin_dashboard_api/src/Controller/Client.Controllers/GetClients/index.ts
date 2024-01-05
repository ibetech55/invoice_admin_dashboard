import { Request, Response } from "express";
import { GetInvoicesUseCase } from "../../../Presentation/Invoice/GetInvoices";
import { GetClientsUseCase } from "../../../Presentation/Client/GetClients";

export class GetClientsController {
    private readonly _getClientUseCase: GetClientsUseCase;
    constructor(getClientUseCase: GetClientsUseCase) {
        this._getClientUseCase = getClientUseCase;
    }

    async handle(request:Request, response:Response) {
        const data = await this._getClientUseCase.execute();
        return response.status(200).json(data);
    }
}