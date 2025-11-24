import { QueryConfig } from "pg";
import { primaryDb } from "./database"
import { CategorySchema, Category } from "../schemas/category.schema";

const getCategoriesFromPrimaryDb = async (sqlQuery: QueryConfig): Promise<Category[]> => {
  if (sqlQuery.values === null) {
    sqlQuery.values = [];
  }

  const primaryCategories = await primaryDb.query(sqlQuery);

  const primaryCategoriesParsed = primaryCategories.rows.map((c) => CategorySchema.parse(c));

  return primaryCategoriesParsed;
};

export const getAllCategories = async (): Promise<Category[]> => {
  // Get only from Primary DB as data is identical in both
  return await getCategoriesFromPrimaryDb({
    text: `SELECT * FROM categories`,
    values: [],
  });
};
