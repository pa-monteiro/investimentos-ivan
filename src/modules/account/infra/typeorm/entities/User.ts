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
    password: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;
    
    @Column()
    deadline: number;
    
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