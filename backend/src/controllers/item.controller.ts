import { Request, Response, NextFunction } from "express";
import { getAllItems, insertItem, updateItem } from "../services/item.service";
import { ItemFilterSchema } from "../schemas/item.schema";
import { CreateItemSchema, UpdateItemSchema } from "../schemas/item.schema";

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

export const changeItem = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = Number(request.params.id);

    if (!id || Number.isNaN(id)) {
      return response.status(400).json({ message: "Invalid item ID" });
    }

    const parsed = UpdateItemSchema.parse(request.body);

    const item = await updateItem(id, parsed);

    if (!item) {
      return response.status(404).json({ message: "Item not found" });
    }

    return response.status(200).json(item);
  } catch (err) {
    next({ message: "Failed to update the item" });
  }
};
