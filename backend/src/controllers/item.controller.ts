import { Request, Response } from "express";
import { getAllItems } from "../services/item.service";
import { ItemFilterSchema } from "../schemas/item.schema";

export const getItems = async (request: Request, response: Response) => {
  try {
    const { shop_id } = ItemFilterSchema.parse(request.query);
    
    const items = await getAllItems(shop_id);

    return response.json(items);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Failed to load items" });
  }
};
