import { Request, Response } from "express";
import { GetTotalValueDueReferenceMonthUseCase } from "../../../Presentation/Invoice/GetTotalValueDueReferenceMonthUseCase";

export class GetTotalValueDueReferenceMonthController {
    private readonly _getTotalValueDueReferenceMonthUseCase: GetTotalValueDueReferenceMonthUseCase;
    constructor(getTotalValueDueReferenceMonthUseCase: GetTotalValueDueReferenceMonthUseCase) {
        this._getTotalValueDueReferenceMonthUseCase = getTotalValueDueReferenceMonthUseCase;
    }

    async handle(request:Request, response:Response) {
        const data = await this._getTotalValueDueReferenceMonthUseCase.execute(request.query);
        return response.status(200).json(data);
    }
}