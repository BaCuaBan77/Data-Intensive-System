import { Request, Response } from "express";
import { getAllUsers } from "../services/user.service";

export const getUsers = async (_request: Request, response: Response) => {
  try {
    const users = await getAllUsers();
    return response.json(users);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Failed to load users" });
  }
};
