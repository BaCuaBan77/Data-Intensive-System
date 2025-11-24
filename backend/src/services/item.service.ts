import { QueryConfig } from "pg";
import { primaryDb, queryAndParse } from "./database"
import { CreateItemSchema, CreateItemInput, ItemSchema, Item, UpdateItemSchema, UpdateItemInput } from "../schemas/item.schema";

export const getItemsFromPrimaryDb = async (
  sqlQuery: QueryConfig
): Promise<Item[]> => {
  return queryAndParse(primaryDb, sqlQuery, ItemSchema);
};

export const getAllItems = async (shop_id: Number): Promise<Item[]> => {
  return await getItemsFromPrimaryDb({
    text: `
      SELECT i.id,
        i.name,
        i.description,
        i.price,
        i.picture,
        i.status,
        c.title as category,
        i.shop_id,    
        i.created_at
      FROM items i
      JOIN categories c ON c.id = i.category
      WHERE i.shop_id = $1
    `,
    values: [`${shop_id}`],
  });
};
