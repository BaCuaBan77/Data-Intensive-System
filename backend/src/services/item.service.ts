import { QueryConfig } from "pg";
import { primaryDb, queryAndParse, queryToBothDbs } from "./database"
import { CreateItemInput, ItemSchema, Item, UpdateItemSchema, UpdateItemInput } from "../schemas/item.schema";

const getItemsFromPrimaryDb = async (
  sqlQuery: QueryConfig
): Promise<Item[]> => {
  return queryAndParse(primaryDb, sqlQuery, ItemSchema);
};

const insertItemToDbs = async (
  sqlQuery: QueryConfig
): Promise<Item> => {
  try {
    return queryToBothDbs(sqlQuery, ItemSchema);
  } catch (err) {
    throw err;
  }
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

export const insertItem = async (body: CreateItemInput): Promise<Item> => {
  return await insertItemToDbs({
    text: `
      WITH inserted AS (
        INSERT INTO items (name, description, price, picture, status, category, shop_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      )
      SELECT i.id,
        i.name,
        i.description,
        i.price,
        i.picture,
        i.status,
        c.title as category,
        i.shop_id,    
        i.created_at
      FROM inserted i
      JOIN categories c ON c.id = i.category;
    `,
    values: [
      body.name,
      body.description,
      body.price,
      body.picture ?? null,
      body.status,
      body.category,
      body.shop_id
    ]
  });
};
