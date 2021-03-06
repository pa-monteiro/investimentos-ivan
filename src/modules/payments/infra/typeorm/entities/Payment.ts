import { User } from "@modules/account/infra/typeorm/entities/User";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

export enum PaymentStatusEnum {
  PENDING = "pending",
  CANCELED = "canceled",
  ACCEPTED = "accepted",
  RELEASED = "released",
  FREE = "free",
}

@Entity("payments")
class Payment {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  value: number;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @Column()
  user_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: "product_id",
  })
  product: Product;

  @Column()
  product_id: string;

  @Column()
  receipt_image: string;

  @Column()
  release_date: Date;

  @Column()
  start_date: Date;

  @Column()
  accepted_at: Date;

  @Column()
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: "accepted_by",
  })
  userAcceptedBy: User;

  @Column()
  accepted_by: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
    }
  }
}

export { Payment };
