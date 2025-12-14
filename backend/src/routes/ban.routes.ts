import { Router } from "express";
import { getBans, createBan } from "../controllers/ban.controller";

const bansRouter = Router();

/**
 * @openapi
 * /api/bans:
 *   get:
 *     tags:
 *       - Bans
 *     summary: Get all bans of a user
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the player
 *     responses:
 *       200:
 *         description: Returns all bans of a user
 *       500:
 *         description: Failed to load bans
 *   post:
 *     tags:
 *       - Bans
 *     summary: Create a new ban
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - player_id
 *               - admin_id
 *               - reason
 *               - start_time
 *               - end_time
 *             properties:
 *               player_id:
 *                 type: integer
 *               admin_id:
 *                 type: integer
 *               reason:
 *                 type: string
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-12-10T15:30:00Z"
 *               end_time:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: "2025-12-10T15:30:00Z"
 *     responses:
 *       201:
 *         description: Ban created successfully
 *       500:
 *         description: Failed to create a ban
 */
bansRouter
  .get("/", getBans)
  .post("/", createBan);

export default bansRouter;
