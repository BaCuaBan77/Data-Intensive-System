import { Router } from "express";
import { getDailyPlayersStat } from "../controllers/metrics.controller";

const metricsRouter = Router();

/**
 * @openapi
 * /api/metrics/daily-active-users:
 *   get:
 *     tags:
 *       - Metrics
 *     summary: Get daily active users
 *     parameters:
 *       - name: interval
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         description: The statistics inteval in days
 *       - name: start_date
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-12-16"
 *         description: Start date for the statistics
 *     responses:
 *       200:
 *         description: Returns statistics
 *       500:
 *         description: Failed to load statistics
 */
metricsRouter
  .get("/daily-active-users", getDailyPlayersStat);

export default metricsRouter;
