import { z, ZodSchema } from "zod";
import { Pool, QueryConfig } from "pg";

export const primaryDb = new Pool({
  connectionString: process.env.PRIMARY_DATABASE_URL
});

export const shardDb = new Pool({
  connectionString: process.env.SHARD_DATABASE_URL
});

export async function queryAndParse<T>(
  db: Pool,
  sql: QueryConfig,
  schema: ZodSchema<T>
): Promise<T[]> {
  const safeQuery = {
    ...sql,
    values: sql.values ?? [],
  };

  const result = await db.query(safeQuery);

  return result.rows.map((row) => schema.parse(row));
};
