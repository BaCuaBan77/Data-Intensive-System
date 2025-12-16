import { Request, Response, NextFunction } from "express";
import { getBansByUserId, insertBan } from "../services/ban.service";
import { UserIdSchema } from "../schemas/user.schema";
import { CreateBanSchema } from "../schemas/ban.schema";

export const getBans = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { user_id } = UserIdSchema.parse(request.query);
    
    const bans = await getBansByUserId(user_id);

    return response.json(bans);
  } catch (err) {
    next({ message: "Failed to load bans" });
  }
};

export const createBan = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const parsed = CreateBanSchema.parse(request.body);

    const ban = await insertBan(parsed);

    return response.status(201).json(ban);
  } catch (err) {
    next({ message: "Failed to create a ban" });
  }
};
