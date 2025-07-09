// src/infrastructure/entities/Event.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column("jsonb")
  payload: any;

  @CreateDateColumn()
  createdAt: Date;
}
