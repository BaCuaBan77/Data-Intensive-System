import express, { Request, Response } from "express";
import usersRouter from "./routes/user.router";
import itemsRouter from "./routes/item.route";
import shopsRouter from "./routes/shop.router";
import categoriesRouter from "./routes/category.route";

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/items", itemsRouter);
app.use("/api/shops", shopsRouter);
app.use("/api/categories", categoriesRouter);

app.get("/", (_req: Request, res: Response) => {
  // TEMP
  res.send("Hello World!");
});

export default app;
