import { QueryConfig } from "pg";
import { queryFromPrimary, queryFromShard } from "./database"
import { UserSchema, User } from "../schemas/user.schema";

const getUsersFromDbs = async (sqlQuery: QueryConfig): Promise<User[]> => {
  if (sqlQuery.values === null) {
    sqlQuery.values = [];
  }

  const primaryUsers = await queryFromPrimary(sqlQuery, UserSchema);
  const shardUsers = await queryFromShard(sqlQuery, UserSchema);

  return [...primaryUsers, ...shardUsers].sort((a, b) => a.id - b.id);
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
    SELECT id,
      email,
      full_name,
      role,
      match_wins,
      match_losses,
      match_ties,
      total_matches,      
      status,
      currency_balance,
      purchased_items,
      rating
    FROM users
    ${where.length ? "WHERE " + where.join(" AND ") : ""};
  `;

  return await getUsersFromDbs({
    text: sql,
    values,
  });
};
