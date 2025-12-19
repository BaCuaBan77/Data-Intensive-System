import { queryToEitherDb, getDbByUserId } from "./database";
import { CreateBanInput, BanSchema, Ban } from "../schemas/ban.schema";

export const getBansByUserId = async (user_id: number): Promise<Ban[]> => {
  const sqlQuery = {
    text: `
      SELECT
        b.id,

        json_build_object(
          'id', u.id,
          'full_name', u.full_name
        ) AS player,

        json_build_object(
          'id', ua.id,
          'full_name', ua.full_name
        ) AS admin,

        b.reason,
        b.start_time,
        b.end_time

      FROM bans b
      JOIN users u ON u.id = b.player_id
      JOIN users ua ON ua.id = b.admin_id
      WHERE b.player_id = $1
      ORDER BY b.id DESC;
    `,
    values: [user_id]
  };

  const dbName = getDbByUserId(user_id);

  return await queryToEitherDb(dbName, sqlQuery, BanSchema);
};

export const insertBan = async (body: CreateBanInput): Promise<Ban> => {
  const sqlQuery = {
    text: `
      WITH inserted AS (
        INSERT INTO bans (player_id, admin_id, reason, start_time, end_time)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      )
      SELECT
        i.id,

        json_build_object(
          'id', u.id,
          'full_name', u.full_name
        ) AS player,

        json_build_object(
          'id', ua.id,
          'full_name', ua.full_name
        ) AS admin,

        i.reason,
        i.start_time,
        i.end_time
      FROM inserted i
      JOIN users u ON u.id = i.player_id
      JOIN users ua ON ua.id = i.admin_id;
    `,
    values: [
      body.player_id,
      body.admin_id,
      body.reason,
      body.start_time,
      body.end_time ?? null
    ]
  };

  const dbName = getDbByUserId(body.player_id);

  // Insert to Primary or Shard
  try {
    const data = await queryToEitherDb(dbName, sqlQuery, BanSchema);
    return data[0]; // Return only the added ban entity
  } catch (err) {
    throw err;
  }
};
