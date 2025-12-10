import { Router } from "express";
import { getItems, createItem } from "../controllers/item.controller";

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
 *   post:
 *     tags:
 *       - Items
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - status
 *               - category
 *               - shop_id
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               picture:
 *                 type: string
 *                 nullable: true
 *                 description: Optional image URL
 *               status:
 *                 type: string
 *               category:
 *                 type: integer
 *               shop_id:
 *                 type: integer
  *     responses:
 *       201:
 *         description: Item created successfully
 */
itemsRouter
  .get("/", getItems)
  .post("/", createItem);

export default itemsRouter;
