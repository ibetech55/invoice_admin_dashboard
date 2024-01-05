import { Request, Response } from "express";
import { GetTotalEnergyValuesUseCase } from "../../../Presentation/InvoiceValues/GetTotalEnergyValuesUseCase";

export class GetTotalEnergyValuesController {
    private readonly _getTotalEnergyValuesUseCase: GetTotalEnergyValuesUseCase;
    constructor(getTotalEnergyValuesUseCase: GetTotalEnergyValuesUseCase) {
        this._getTotalEnergyValuesUseCase = getTotalEnergyValuesUseCase;
    }

    async handle(request:Request, response:Response) {
        const data = await this._getTotalEnergyValuesUseCase.execute();
        return response.status(200).json(data);
    }
}