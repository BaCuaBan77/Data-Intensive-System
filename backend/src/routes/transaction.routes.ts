import { Router } from "express";
import { getTransactions } from "../controllers/transaction.controller";

const transactionRouter = Router();

/**
 * @openapi
 * /api/transactions:
 *   get:
 *     tags:
 *       - Transactions
 *     summary: Get all transactions
 *     responses:
 *       200:
 *         description: Returns all transactions
 *       500:
 *         description: Failed to load transactions
 */
transactionRouter.get("/", getTransactions);

export default transactionRouter;
