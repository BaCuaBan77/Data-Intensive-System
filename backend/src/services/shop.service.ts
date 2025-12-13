import { queryFromPrimary } from "./database"
import { ShopSchema, Shop } from "../schemas/shop.schema";

export const getAllShops = async (): Promise<Shop[]> => {
  // Get only from Primary DB as shops are identical in both
  const sqlQuery = {
    text: `SELECT * FROM shops;`,
    values: [],
  };

  return await queryFromPrimary(sqlQuery, ShopSchema);
};
