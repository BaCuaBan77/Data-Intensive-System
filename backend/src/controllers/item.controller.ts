import { Request, Response, NextFunction } from "express";
import { getAllItems } from "../services/item.service";
import { ItemFilterSchema } from "../schemas/item.schema";

export const getItems = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { shop_id } = ItemFilterSchema.parse(request.query);
    
    const items = await getAllItems(shop_id);

    return response.json(items);
  } catch (err) {
    next({ message: "Failed to load items" });
  }
};
