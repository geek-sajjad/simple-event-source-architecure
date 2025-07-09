// src/index.ts
import app from "./app";
import { AppDataSource } from "./infrastructure/data-source";

AppDataSource.initialize().then(() => {
  app.listen(3000, () =>
    console.log("Event-sourced app running on http://localhost:3000")
  );
});
