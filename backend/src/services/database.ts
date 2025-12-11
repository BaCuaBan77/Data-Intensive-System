import { ZodSchema } from "zod";
import { Pool, QueryConfig } from "pg";

const primaryDb = new Pool({
  connectionString: process.env.PRIMARY_DATABASE_URL
});

const shardDb = new Pool({
  connectionString: process.env.SHARD_DATABASE_URL
});

//Sharding rule: User ID % 2 = 0 -> PRIMARY, User ID % 2 = 1 -> SHARD
export const getDbByUserId = async (user_id: number): Promise<String> => {
  return user_id % 2 === 0 ? "primaryDb" : "shardDb";
};

const queryAndParse = async <T>(
  db: Pool,
  sql: QueryConfig,
  schema: ZodSchema<T>
): Promise<T[]> => {
  const safeQuery = {
    ...sql,
    values: sql.values ?? [],
  };

  const result = await db.query(safeQuery);

  return result.rows.map((row) => schema.parse(row));
};

export const queryFromPrimary = async <T>(
  sql: QueryConfig,
  schema: ZodSchema<T>
): Promise<T[]> => {
  return queryAndParse(primaryDb, sql, schema);
};

export const queryFromShard = async <T>(
  sql: QueryConfig,
  schema: ZodSchema<T>
): Promise<T[]> => {
  return queryAndParse(shardDb, sql, schema);
};

export const queryToBothDbs = async <T>(
  sql: QueryConfig,
  schema: ZodSchema<T>
): Promise<T> => {
  const safeQuery = {
    ...sql,
    values: sql.values ?? [],
  };

  try {
    // Begin transaction
    await primaryDb.query("BEGIN");
    await shardDb.query("BEGIN");

    // Run query on both DBs
    const primaryResult = await primaryDb.query(safeQuery);
    await shardDb.query(safeQuery);

    // Commit both
    await primaryDb.query("COMMIT");
    await shardDb.query("COMMIT");

    // Return only primary data
    return primaryResult.rows.map((row) => schema.parse(row))[0];
  } catch (err) {
    // Safely rollback without warnings
    try { await primaryDb.query("ROLLBACK"); } catch {}
    try { await shardDb.query("ROLLBACK"); } catch {}
    throw err;
  }
};
