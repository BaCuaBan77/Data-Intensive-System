import { queryFromPrimary } from "./database"
import { ShopSchema, Shop } from "../schemas/shop.schema";

export const getAllShops = async (): Promise<Shop[]> => {
  // Get data only from Primary DB as it is identical in both
  const sqlQuery = {
    text: `SELECT * FROM shops;`,
    values: [],
  };

  return await queryFromPrimary(sqlQuery, ShopSchema);
};
