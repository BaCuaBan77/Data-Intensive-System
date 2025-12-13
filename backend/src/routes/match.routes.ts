import { Router } from "express";
import { getMatches } from "../controllers/match.controller";

const matchRouter = Router();

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
 */
matchRouter.get("/", getMatches);

export default matchRouter;
