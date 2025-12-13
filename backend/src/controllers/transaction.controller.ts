import { Request, Response, NextFunction } from "express";
import { getAllTransactions } from "../services/transaction.service";

export const getTransactions = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const transactions = await getAllTransactions();

    return response.json(transactions);
  } catch (err) {
    console.log(err);
    next({ message: "Failed to load transactions" });
  }
};
