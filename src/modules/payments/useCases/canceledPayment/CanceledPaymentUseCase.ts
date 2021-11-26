import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { PaymentStatusEnum } from '@modules/payments/infra/typeorm/entities/Payment';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPaymentRepository } from '../../repositories/IPaymentRepository';

@injectable()
class CanceledPaymentUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}

    async execute(id: string, user_id:string){
        const userExists = await this.usersRepository.findById(user_id);
        if(!userExists){
            throw new AppError('Usuário não existe.')
        }

        const payment = await this.repository.findById(id);
        if(payment.status !== PaymentStatusEnum.PENDING){
            throw new AppError(`Não é possível cancelar este pagamento. Status atual: ${payment.status}`)
        }

        return await this.repository.canceled(id, user_id);
    }
}

export {
    CanceledPaymentUseCase
}