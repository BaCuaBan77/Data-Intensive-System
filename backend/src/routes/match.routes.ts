import { Router } from "express";
import { getMatches } from "../controllers/match.controller";

const matchesRouter = Router();

/**
 * @openapi
 * /api/matches:
 *   get:
 *     tags:
 *       - Matches
 *     summary: Get all matches
 *     responses:
 *       200:
 *         description: Returns all matches
 *       500:
 *         description: Failed to load matches
 */
matchesRouter.get("/", getMatches);

export default matchesRouter;
