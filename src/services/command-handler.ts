// src/services/command-handler.ts
import { AppDataSource } from "../infrastructure/data-source";
import { Event } from "../infrastructure/entities/Event";

export async function handleCommand(command: {
  type: string;
  userId: string;
  payload: any;
}) {
  const repo = AppDataSource.getRepository(Event);

  const event = repo.create({
    type: command.type,
    userId: command.userId,
    payload: command.payload,
  });

  await repo.save(event);
  return event;
}
