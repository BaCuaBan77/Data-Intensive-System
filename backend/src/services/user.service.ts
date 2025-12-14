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
    where.push(`u.role = $${values.length}`);
  }

  // Filter by status
  if (status) {
    values.push(status);
    where.push(`u.status = $${values.length}`);
  }

  // Filter by email
  if (email) {
    values.push(`%${email}%`);
    where.push(`u.email ILIKE $${values.length}`);
  }

  // Adding banned = true only if the latest added ban
  // has start_time less than now and is endless and
  // has start_time less than now and end_time more than now
  const sql = `
    SELECT
      u.id,
      u.email,
      u.full_name,
      u.role,
      u.match_wins,
      u.match_losses,
      u.match_ties,
      u.total_matches,      
      u.status,
      u.currency_balance,
      u.purchased_items,
      u.rating,

      CASE
        WHEN b.id IS NULL THEN false
        WHEN b.start_time > NOW() THEN false
        WHEN b.end_time IS NULL THEN true
        WHEN b.end_time > NOW() THEN true
        ELSE false
      END AS banned

    FROM users u

    LEFT JOIN LATERAL (
      SELECT id, start_time, end_time
      FROM bans
      WHERE player_id = u.id
      ORDER BY id DESC
      LIMIT 1
    ) b ON TRUE

    ${where.length ? "WHERE " + where.join(" AND ") : ""};
  `;

  return await queryFromBothDbs({
    text: sql,
    values,
  }, UserSchema);
};
