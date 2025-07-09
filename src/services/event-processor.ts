// src/services/event-processor.ts
import { Event } from "../infrastructure/entities/Event";

export function replay(events: Event[]) {
  let state = {
    name: "",
    balance: 0,
  };

  for (const event of events) {
    switch (event.type) {
      case "UserCreated":
        state.name = event.payload.name;
        state.balance = 0;
        break;
      case "MoneyDeposited":
        state.balance += event.payload.amount;
        break;
      case "MoneyWithdrawn":
        state.balance -= event.payload.amount;
        break;
    }
  }

  return state;
}
