import { primaryDb, shardDb } from "./database"
import { userSchema, User } from "../schemas/user.schema";

export const getAllUsers = async (): Promise<User[]> => {
  const sqlQuery = "SELECT * FROM users";
  const primaryUsers = await primaryDb.query(sqlQuery);
  const shardUsers = await shardDb.query(sqlQuery);

  const primaryUsersParsed = primaryUsers.rows.map((u) => userSchema.parse({ ...u, source: "primary" }));
  const shardUsersParsed = shardUsers.rows.map((u) => userSchema.parse({ ...u, source: "shard" }));

  return primaryUsersParsed.concat(shardUsersParsed);
};
