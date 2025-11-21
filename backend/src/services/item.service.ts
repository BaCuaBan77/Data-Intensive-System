import { QueryConfig } from "pg";
import { primaryDb, shardDb } from "./database"
import { CreateItemSchema, CreateItemInput, ItemSchema, Item, UpdateItemSchema, UpdateItemInput } from "../schemas/item.schema";

const getItemsFromDbs = async (sqlQuery: QueryConfig): Promise<Item[]> => {
  if (sqlQuery.values === null) {
    sqlQuery.values = [];
  }

  const primaryItems = await primaryDb.query(sqlQuery);
  const shardItems = await shardDb.query(sqlQuery);

  const primaryItemsParsed = primaryItems.rows.map((i) => ItemSchema.parse({ ...i, source: "primary" }));
  const shardItemsParsed = shardItems.rows.map((i) => ItemSchema.parse({ ...i, source: "shard" }));

  return [...primaryItemsParsed, ...shardItemsParsed];
};

export const getAllItems = async (): Promise<Item[]> => {
  return await getItemsFromDbs({
    text: `SELECT * FROM items`,
    values: [],
  });
};
