import { Request, Response, NextFunction } from "express";
import { calculateDailyPlayersStat } from "../services/metrics.service";
import { MetricsRequestSchema } from "../schemas/metrics.schema";

export const getDailyPlayersStat = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = MetricsRequestSchema.parse(request.query);

    const stats = await calculateDailyPlayersStat(params);

    return response.json(stats);
  } catch (err) {
    next({ message: "Failed to load stats" });
  }
};
