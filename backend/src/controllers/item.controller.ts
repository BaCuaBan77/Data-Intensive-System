import { Request, Response, NextFunction } from "express";
import { getAllItems, insertItem } from "../services/item.service";
import { ItemFilterSchema } from "../schemas/item.schema";
import { CreateItemSchema, CreateItemInput, ItemSchema, Item, UpdateItemSchema, UpdateItemInput } from "../schemas/item.schema";

export const getItems = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { shop_id } = ItemFilterSchema.parse(request.query);
    
    const items = await getAllItems(shop_id);

    return response.json(items);
  } catch (err) {
    next({ message: "Failed to load items" });
  }
};

export const createItem = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const parsed = CreateItemSchema.parse(request.body);

    const item = await insertItem(parsed);

    return response.status(201).json(item);
  } catch (err) {
    next({ message: "Failed to create an item" });
  }
};
