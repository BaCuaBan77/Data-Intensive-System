import { Router } from "express";
import { getItems } from "../controllers/item.controller";

const itemsRouter = Router();

/**
 * @openapi
 * /api/items:
 *   get:
 *     tags:
 *       - Items
 *     summary: Get all items
 *     parameters:
 *       - name: shop_id
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shop to filter items by
 *     responses:
 *       200:
 *         description: Returns all items
 */
itemsRouter.get("/", getItems);

export default itemsRouter;
