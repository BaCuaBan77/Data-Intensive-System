import { Request, Response, NextFunction } from "express";
import {
  calculateDailyPlayersStat,
  calculateMonthlyPlayersStat,
  calculateDailyMatchesStat,
  calculateDailySalesStat
} from "../services/metrics.service";
import { MetricsRequestSchema } from "../schemas/metrics.schema";

export const getDailyPlayersStat = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = MetricsRequestSchema.parse(request.query);

    const stats = await calculateDailyPlayersStat(params);

    return response.json(stats);
  } catch (err) {
    next({ message: "Failed to load statistics" });
  }
};

export const getMonthlyPlayersStat = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = MetricsRequestSchema.parse(request.query);

    const stats = await calculateMonthlyPlayersStat(params);

    return response.json(stats);
  } catch (err) {
    next({ message: "Failed to load statistics" });
  }
};

export const getDailyMatchesStat = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = MetricsRequestSchema.parse(request.query);

    const stats = await calculateDailyMatchesStat(params);

    return response.json(stats);
  } catch (err) {
    next({ message: "Failed to load statistics" });
  }
};

export const getDailySalesStat = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = MetricsRequestSchema.parse(request.query);

    const stats = await calculateDailySalesStat(params);

    return response.json(stats);
  } catch (err) {
    next({ message: "Failed to load statistics" });
  }
};
