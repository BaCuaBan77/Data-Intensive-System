import { ZodSchema } from "zod";
import { Pool, QueryConfig } from "pg";

const PRIMARY_DB = "primaryDb";
const SHARD_DB = "shardDb";

const primaryDb = new Pool({
  connectionString: process.env.PRIMARY_DATABASE_URL
});

const shardDb = new Pool({
  connectionString: process.env.SHARD_DATABASE_URL
});

// Sharding rule: User ID % 2 = 0 -> PRIMARY, User ID % 2 = 1 -> SHARD
export const getDbByUserId = (user_id: number): string => {
  return user_id % 2 === 0 ? PRIMARY_DB : SHARD_DB;
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

export const queryPrimary = async <T>(
  sql: QueryConfig,
  schema: ZodSchema<T>
): Promise<T[]> => {
  return await queryAndParse(primaryDb, sql, schema);
};

export const queryShard = async <T>(
  sql: QueryConfig,
  schema: ZodSchema<T>
): Promise<T[]> => {
  return await queryAndParse(shardDb, sql, schema);
};

// Used for the cases when data is different in databases and has to be inserted only to one database
export const queryToEitherDb = async <T>(
  dbName: string,
  sql: QueryConfig,
  schema: ZodSchema<T>
): Promise<T[]> => {
  if (dbName === PRIMARY_DB) {
    return await queryPrimary(sql, schema);
  } else if (dbName === SHARD_DB) {
    return await queryShard(sql, schema);
  }

  return [];
};

// Used for the cases when data is different in databases and has to be merged when retrieved
export const queryFromBothDbs = async <T extends { id: number }>(
  sql: QueryConfig,
  schema: ZodSchema<T>
): Promise<T[]> => {
  const primaryData = await queryPrimary(sql, schema);
  const shardData = await queryShard(sql, schema);

  return [...primaryData, ...shardData].sort((a, b) => a.id - b.id);
};

// Used for the cases when data is the same in both databases and has to be updated at the same time,
// and no need to merge results from both databases
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
