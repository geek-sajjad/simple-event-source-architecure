// src/infrastructure/data-source.ts
import { DataSource } from "typeorm";
import { Event } from "./entities/Event";
import { UserProjection } from "./entities/UserProjection";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "event-source",
  synchronize: true,
  logging: false,
  entities: [Event, UserProjection],
});
