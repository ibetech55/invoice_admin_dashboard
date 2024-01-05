import { Request, Response } from "express";
import { GetClientByIdUseCase } from "../../../Presentation/Client/GetClientById";


export class GetClientByIdController {
    private readonly _getClientByIdUseCase: GetClientByIdUseCase;
    constructor(getClientByIdUseCase: GetClientByIdUseCase) {
        this._getClientByIdUseCase = getClientByIdUseCase;
    }

    async handle(request:Request, response:Response) {
        console.log(request.params.id)
        const data = await this._getClientByIdUseCase.execute(Number(request.params.id));
        return response.status(200).json(data);
    }
}