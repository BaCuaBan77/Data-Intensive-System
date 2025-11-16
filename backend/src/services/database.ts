import { Pool } from 'pg';

export const primaryDb = new Pool({
  connectionString: process.env.PRIMARY_DATABASE_URL
});

export const shardDb = new Pool({
  connectionString: process.env.SHARD_DATABASE_URL
});
