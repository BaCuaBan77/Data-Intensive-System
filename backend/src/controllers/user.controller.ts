import { Request, Response } from "express";
import { getAllUsers, findUserByEmail } from "../services/user.service";
import { SearchSchema } from "../schemas/user.schema";

export const getUsers = async (request: Request, response: Response) => {
  try {
    const { email } = SearchSchema.parse(request.query);

    if (!email) {
      const users = await getAllUsers();
      return response.json(users);
    }

    const users = await findUserByEmail(email);
    return response.json(users);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Failed to load users" });
  }
};
