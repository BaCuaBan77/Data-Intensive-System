import { Request, Response } from "express";
import { getAllItems } from "../services/item.service";

export const getItems = async (_request: Request, response: Response) => {
  try {
    const items = await getAllItems();

    return response.json(items);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Failed to load items" });
  }
};
