import express from "express";
import { swaggerUi, swaggerSpec } from "./swagger";
import { errorHandler } from "./utils/middleware";
import cors from "cors";
import usersRouter from "./routes/user.routes";
import itemsRouter from "./routes/item.routes";
import shopsRouter from "./routes/shop.routes";
import utilsRouter from "./routes/utils.routes";
import matchesRouter from "./routes/match.routes";
import categoriesRouter from "./routes/category.routes";
import transactionsRouter from "./routes/transaction.routes";

const app = express();

// Enable CORS for all routes and origins
app.use(cors());

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/items", itemsRouter);
app.use("/api/shops", shopsRouter);
app.use("/api/matches", matchesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/transactions", transactionsRouter);

app.use("/api", utilsRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
