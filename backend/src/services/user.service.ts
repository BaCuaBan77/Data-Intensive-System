import { QueryConfig } from "pg";
import { primaryDb, shardDb } from "./database"
import { UserSchema, User } from "../schemas/user.schema";

const getUsersFromDbs = async (sqlQuery: QueryConfig): Promise<User[]> => {
  if (sqlQuery.values === null) {
    sqlQuery.values = [];
  }

  const primaryUsers = await primaryDb.query(sqlQuery);
  const shardUsers = await shardDb.query(sqlQuery);

  const primaryUsersParsed = primaryUsers.rows.map((u) => UserSchema.parse({ ...u, source: "primary" }));
  const shardUsersParsed = shardUsers.rows.map((u) => UserSchema.parse({ ...u, source: "shard" }));

  return [...primaryUsersParsed, ...shardUsersParsed];
};

export const findUsers = async ({
  email,
  status,
  role,
}: {
  email?: string | null;
  status?: string | null;
  role?: string | null;
}): Promise<User[]> => {
  const where: string[] = [];
  const values: any[] = [];

  if (role) {
    values.push(role);
    where.push(`role = $${values.length}`);
  }

  if (status) {
    values.push(status);
    where.push(`status = $${values.length}`);
  }

  if (email) {
    values.push(`%${email}%`);
    where.push(`email ILIKE $${values.length}`);
  }

  const sql = `
    SELECT * FROM users
    ${where.length ? "WHERE " + where.join(" AND ") : ""}
  `;

  return await getUsersFromDbs({
    text: sql,
    values,
  });
};
