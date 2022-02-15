import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
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
  percentage?: string;

  @Column()
  profitability?: number;

  @Column()
  withdrawal_deadline: number;

  @Column()
  deadline_contribution: number;

  @Column()
  lucro_mensal: number;

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

export { Product };
