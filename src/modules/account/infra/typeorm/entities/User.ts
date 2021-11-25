import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    cep: number;

    @Column()
    cpf: number;

    @Column()
    number: number;

    @Column()
    neighborhood: string;

    @Column()
    complement: string;

    @Column()
    phone: number;

    @Column({select: false})
    password: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;
    
    @ManyToMany(() => Product)
    @JoinTable({
        name: "users_products",
        joinColumns: [{name: 'user_id'}],
        inverseJoinColumns: [{name: 'product_id'}]
    })
    products: Product[];

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
    User
}