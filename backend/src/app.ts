import express, { Request, Response } from "express";
import usersRouter from "./routes/user.router";
import itemsRouter from "./routes/item.route";

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/items", itemsRouter);

app.get("/", (_req: Request, res: Response) => {
  // TEMP
  res.send("Hello World!");
});

export default app;
