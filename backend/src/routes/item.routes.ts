import { Router } from "express";
import { getItems, createItem, changeItem, removeItem } from "../controllers/item.controller";

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
 *       500:
 *         description: Failed to load items
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
 *       500:
 *         description: Failed to create an item
 * /api/items/{id}:
 *   patch:
 *     tags:
 *       - Items
 *     summary: Update an item by ID
 *     description: Updates one or more fields of an existing item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 255
 *               description:
 *                 type: string
 *                 maxLength: 255
 *               price:
 *                 type: number
 *                 minimum: 0
 *               picture:
 *                 type: string
 *                 maxLength: 255
 *               status:
 *                 type: string
 *                 enum: [available, not_available]
 *               category:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 30
 *               shop_id:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 2
 *     responses:
 *       200:
 *         description: Successfully updated the item
 *       400:
 *         description: Invalid ID or invalid body
 *       404:
 *         description: Item not found
 *       500:
 *         description: Failed to update the item
 *   delete:
 *     tags:
 *       - Items
 *     summary: Delete an item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item deleted
 *       400:
 *         description: Invalid ID or invalid body
 *       404:
 *         description: Item not found
 *       500:
 *         description: Failed to delete the item
 */
itemsRouter
  .get("/", getItems)
  .post("/", createItem)
  .patch("/:id", changeItem)
  .delete("/:id", removeItem);

export default itemsRouter;
