import { Router } from 'express';
import { primaryDb, shardDb } from '../services/database'
import { userSchema } from '../schemas/user.schema.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  try {
    const primaryUsers = await primaryDb.query(
      "SELECT * FROM users"
    );

    const parsed = primaryUsers.rows.map((u) => userSchema.parse(u));

    return response.json(parsed);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Failed to load users" });
  }
});

export default usersRouter;
