import { AppDataSource } from "../infrastructure/data-source";

import { Event } from "../infrastructure/entities/Event";
import { UserProjection } from "../infrastructure/entities/UserProjection";
import { replay } from "./event-processor";

export async function updateProjection(userId: string) {
  const eventRepo = AppDataSource.getRepository(Event);
  const projectionRepo = AppDataSource.getRepository(UserProjection);

  const events = await eventRepo.find({
    where: { userId },
    order: { createdAt: "ASC" },
  });
  const state = replay(events);

  await projectionRepo.save({
    userId,
    name: state.name,
    balance: state.balance,
  });
}
