import { Request, Response, NextFunction } from "express";
import { getDbByUserId } from "../services/database";
import { UserIdSchema } from "../schemas/user.schema";

export const getDatabaseName = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { user_id } = UserIdSchema.parse(request.query);
    
    const dbName = getDbByUserId(user_id);

    return response.json({ dbName });
  } catch (err) {
    next({ message: "Failed to return database name" });
  }
};
