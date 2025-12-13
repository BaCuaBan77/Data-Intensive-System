import { Request, Response, NextFunction } from "express";
import { getAllCategories } from "../services/category.service";

export const getCategories = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const categories = await getAllCategories();

    return response.json(categories);
  } catch (err) {
    next({ message: "Failed to load categories" });
  }
};
