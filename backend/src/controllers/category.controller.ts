import { Request, Response } from "express";
import { getAllCategories } from "../services/category.service";

export const getCategories = async (_request: Request, response: Response) => {
  try {
    const categories = await getAllCategories();

    return response.json(categories);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Failed to load shops" });
  }
};
