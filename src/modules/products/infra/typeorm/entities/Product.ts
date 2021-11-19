import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("products")
class Product {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    percentage: string;

    @Column()
    deadline_transaction: number;

    @Column()
    value?: number;

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
    Product
}