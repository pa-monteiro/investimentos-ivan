import { User } from "@modules/account/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("daily_postings")
class DailyPosting {

    @PrimaryColumn()
    id: string;

    @Column()
    date: Date;

    @Column()
    value: string;

    @ManyToOne(() => User)
    @JoinColumn({
        name: "user_id"
    })
    user: User;

    @Column()
    user_id: string;

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
    DailyPosting
}