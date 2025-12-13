import { Router } from "express";
import { getUsers } from "../controllers/user.controller";

const usersRouter = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     parameters:
 *       - name: role
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter users by role
 *       - name: status
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter users by status
 *       - name: email
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           format: email
 *         description: Filter users by email  
 *     responses:
 *       200:
 *         description: Returns all users
 *       500:
 *         description: Failed to load users
 */
usersRouter.get("/", getUsers);

export default usersRouter;
