import { Router } from "express";
import { getDatabaseName } from "../controllers/utils.controller";

const utilsRouter = Router();

/**
 * @openapi
 * /api/get-database-name:
 *   get:
 *     tags:
 *       - Utils
 *     summary: Get database that stores the user
 *     parameters:
 *       - name: user_id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns database name
 *       500:
 *         description: Failed to load database name
 */
utilsRouter.get("/get-database-name", getDatabaseName);

export default utilsRouter;
