// src/app.ts
import express from "express";
import { AppDataSource } from "./infrastructure/data-source";
import { handleCommand } from "./services/command-handler";
import { updateProjection } from "./services/projector";
import { UserProjection } from "./infrastructure/entities/UserProjection";

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  const { userId, name } = req.body;
  await handleCommand({ type: "UserCreated", userId, payload: { name } });
  await updateProjection(userId);
  res.status(201).send({ userId, name });
});

app.post("/users/:userId/deposit", async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  await handleCommand({ type: "MoneyDeposited", userId, payload: { amount } });
  await updateProjection(userId);
  res.send({ userId, amount });
});

app.post("/users/:userId/withdraw", async (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;
  await handleCommand({ type: "MoneyWithdrawn", userId, payload: { amount } });
  await updateProjection(userId);
  res.send({ userId, amount });
});

app.get("/users/:userId/balance", async (req, res) => {
  const repo = AppDataSource.getRepository(UserProjection);
  const user = await repo.findOneBy({ userId: req.params.userId });
  if (!user) return res.status(404).send({ error: "User not found" });
  res.send({ userId: user.userId, balance: user.balance });
});

export default app;
