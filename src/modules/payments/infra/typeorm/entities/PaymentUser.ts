import { User } from "@modules/account/infra/typeorm/entities/User";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("payments_users")
class PaymentUser {

    @PrimaryColumn()
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: "user_id"
    })
    user: User;

    @Column()
    user_id: string;

    @ManyToOne(() => Product)
    @JoinColumn({
        name: "product_id"
    })
    product: Product;

    @Column()
    product_id: string;

    @Column()
    value: number;

    @Column()
    percentage: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = v4();
        }
    }

}

export {
    PaymentUser
}