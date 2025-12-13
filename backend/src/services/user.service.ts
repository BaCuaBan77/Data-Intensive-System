import { queryFromBothDbs } from "./database"
import { UserSchema, User } from "../schemas/user.schema";

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

  // Filter by role
  if (role) {
    values.push(role);
    where.push(`role = $${values.length}`);
  }

  // Filter by status
  if (status) {
    values.push(status);
    where.push(`status = $${values.length}`);
  }

  // Filter by email
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

  return await queryFromBothDbs({
    text: sql,
    values,
  }, UserSchema);
};
