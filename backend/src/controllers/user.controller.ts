import { Request, Response } from "express";
import { findUsers } from "../services/user.service";
import { SearchSchema } from "../schemas/user.schema";

export const getUsers = async (request: Request, response: Response) => {
  try {
    const params = SearchSchema.parse(request.query);

    const users = await findUsers(params);

    return response.json(users);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Failed to load users" });
  }
};
