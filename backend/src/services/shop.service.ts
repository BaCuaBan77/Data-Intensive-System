import { QueryConfig } from "pg";
import { primaryDb, queryAndParse } from "./database"
import { ShopSchema, Shop } from "../schemas/shop.schema";

export const getShopsFromPrimaryDb = async (
  sqlQuery: QueryConfig
): Promise<Shop[]> => {
  return queryAndParse(primaryDb, sqlQuery, ShopSchema);
};

export const getAllShops = async (): Promise<Shop[]> => {
  // Get only from Primary DB as shops are identical in both
  return await getShopsFromPrimaryDb({
    text: `SELECT * FROM shops;`,
    values: [],
  });
};
