// src/infrastructure/entities/UserProjection.ts
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class UserProjection {
  @PrimaryColumn()
  userId: string;

  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  balance: number;
}
