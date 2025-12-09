import { Request, Response, NextFunction } from "express";
import { findUsers } from "../services/user.service";
import { SearchSchema } from "../schemas/user.schema";

export const getUsers = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = SearchSchema.parse(request.query);

    const users = await findUsers(params);

    return response.json(users);
  } catch (err) {
    next({ message: "Failed to load users" });
  }
};
