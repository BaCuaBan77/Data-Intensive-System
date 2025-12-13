import { Router } from "express";
import { getCategories } from "../controllers/category.controller";

const categoriesRouter = Router();

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Returns all categories
 */
categoriesRouter.get("/", getCategories);

export default categoriesRouter;
