import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePaymentReceiptFileUseCase } from "./UpdatePaymentReceiptFileUseCase";

class UpdatePaymentReceiptFileController {

    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const file = request.file.originalname;
        const useCase = container.resolve(UpdatePaymentReceiptFileUseCase);
        await useCase.execute(id, file);

        return response.status(200).send();
    }

}

export {
    UpdatePaymentReceiptFileController
}