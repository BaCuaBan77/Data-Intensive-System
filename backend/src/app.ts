import express, { Request, Response } from "express";
import usersRouter from "./routes/user.router";

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);

app.get("/", (_req: Request, res: Response) => {
  // TEMP
  res.send("Hello World!");
});

export default app;
