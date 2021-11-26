import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'
import { User } from './User';

@Entity("bank_accounts")
class BankAccount {
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    full_name: string;

    @Column()
    agency: string;

    @Column()
    account: string;

    @Column()
    cpf: string;

    @Column()
    pix: string;

    @Column()
    isAdmin: boolean;

    @OneToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }
}

export {
    BankAccount
}