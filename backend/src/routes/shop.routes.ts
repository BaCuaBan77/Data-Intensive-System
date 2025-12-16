import { Router } from "express";
import { getShops } from "../controllers/shop.controller";

const shopsRouter = Router();

/**
 * @openapi
 * /api/shops:
 *   get:
 *     tags:
 *       - Shops
 *     summary: Get all shops
 *     responses:
 *       200:
 *         description: Returns all shops
 *       500:
 *         description: Failed to load shops
 */
shopsRouter.get("/", getShops);

export default shopsRouter;
