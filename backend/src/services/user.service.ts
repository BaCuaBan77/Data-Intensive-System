import { primaryDb, shardDb } from "./database"
import { UserSchema, User } from "../schemas/user.schema";

export const getAllUsers = async (): Promise<User[]> => {
  const sqlQuery = "SELECT * FROM users";
  const primaryUsers = await primaryDb.query(sqlQuery);
  const shardUsers = await shardDb.query(sqlQuery);

  const primaryUsersParsed = primaryUsers.rows.map((u) => UserSchema.parse({ ...u, source: "primary" }));
  const shardUsersParsed = shardUsers.rows.map((u) => UserSchema.parse({ ...u, source: "shard" }));

  return primaryUsersParsed.concat(shardUsersParsed);
};

export const findUserByEmail = async (email: String): Promise<User[]> => {
  const sqlQuery = `SELECT * FROM users WHERE email ILIKE $1`;
  const values = [`%${email}%`];

  const primaryUsers = await primaryDb.query(sqlQuery, values);
  const shardUsers = await shardDb.query(sqlQuery, values);

  const primaryUsersParsed = primaryUsers.rows.map((u) => UserSchema.parse({ ...u, source: "primary" }));
  const shardUsersParsed = shardUsers.rows.map((u) => UserSchema.parse({ ...u, source: "shard" }));

  return primaryUsersParsed.concat(shardUsersParsed);
};
