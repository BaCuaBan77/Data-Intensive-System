import { QueryConfig } from "pg";
import { primaryDb } from "./database"
import { CreateItemSchema, CreateItemInput, ItemSchema, Item, UpdateItemSchema, UpdateItemInput } from "../schemas/item.schema";

const getItemsFromPrimaryDb = async (sqlQuery: QueryConfig): Promise<Item[]> => {
  if (sqlQuery.values === null) {
    sqlQuery.values = [];
  }

  const primaryItems = await primaryDb.query(sqlQuery);

  const primaryItemsParsed = primaryItems.rows.map((i) => ItemSchema.parse(i));

  return primaryItemsParsed;
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
