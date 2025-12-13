import { Request, Response, NextFunction } from "express";
import { getAllMatches } from "../services/match.service";

export const getMatches = async (_request: Request, response: Response, next: NextFunction) => {
  try {
    const matches = await getAllMatches();

    return response.json(matches);
  } catch (err) {
    next({ message: "Failed to load matches" });
  }
};
