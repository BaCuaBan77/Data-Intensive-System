import { QueryConfig } from "pg";
import { queryFromPrimary } from "./database"
import { CategorySchema, Category } from "../schemas/category.schema";

export const getCategoriesFromPrimaryDb = async (
  sqlQuery: QueryConfig
): Promise<Category[]> => {
  return queryFromPrimary(sqlQuery, CategorySchema);
};

export const getAllCategories = async (): Promise<Category[]> => {
  // Get only from Primary DB as data is identical in both
  return await getCategoriesFromPrimaryDb({
    text: `SELECT * FROM categories;`,
    values: [],
  });
};
