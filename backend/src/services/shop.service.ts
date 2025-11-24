import { QueryConfig } from "pg";
import { primaryDb } from "./database"
import { ShopSchema, Shop } from "../schemas/shop.schema";

const getShopsFromPrimaryDb = async (sqlQuery: QueryConfig): Promise<Shop[]> => {
  if (sqlQuery.values === null) {
    sqlQuery.values = [];
  }

  const primaryShops = await primaryDb.query(sqlQuery);

  const primaryShopsParsed = primaryShops.rows.map((s) => ShopSchema.parse(s));

  return primaryShopsParsed;
};

export const getAllShops = async (): Promise<Shop[]> => {
  // Get only from Primary DB as shops are identical in both
  return await getShopsFromPrimaryDb({
    text: `SELECT * FROM shops`,
    values: [],
  });
};
