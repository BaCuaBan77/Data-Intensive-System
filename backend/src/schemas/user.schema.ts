import { z } from "zod";

// GET /users
export const userSchema = z.object({
  id: z.number().int(),

  email: z.email(),
  password: z.string(),
  full_name: z.string(),
  role: z.string(),

  match_wins: z.int(),
  match_losses: z.int(),
  match_ties: z.int(),
  total_matches: z.int(),

  status: z.string(),
  currency_balance: z.coerce.number(),
  purchased_items: z.any(),
  rating: z.number(),
});

export type User = z.infer<typeof userSchema>;
