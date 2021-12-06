import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";7
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

@injectable()
class UpdatePaymentReceiptFileUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ){}

    async execute(id: string, fileName: string){
        const payment = await this.repository.findById(id);

        // if(payment.receipt_image){
        //     await this.storageProvider.delete(fileName, "receipts");
        // }

        const receipt_image = await this.storageProvider.save(fileName, "receipts");

        payment.receipt_image = receipt_image;

        await this.repository.create(payment);
    }
} 

export {
    UpdatePaymentReceiptFileUseCase
}