import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { deleteFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdatePaymentReceiptFileUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}

    async execute(id: string, fileName: string){
        const payment = await this.repository.findById(id);
        
        if(payment.receipt_image){
            await deleteFile(`./tmp/receipt/${payment.receipt_image}`)
        }
        
        payment.receipt_image = fileName;

        await this.repository.create(payment);
    }
}

export {
    UpdatePaymentReceiptFileUseCase
}