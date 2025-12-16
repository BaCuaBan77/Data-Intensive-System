import { queryPrimary } from "./database"
import { CategorySchema, Category } from "../schemas/category.schema";

export const getAllCategories = async (): Promise<Category[]> => {
  // Get data only from Primary DB as it is identical in both
  const sqlQuery = {
    text: `SELECT * FROM categories;`,
    values: [],
  };

  return await queryPrimary(sqlQuery, CategorySchema);
};
