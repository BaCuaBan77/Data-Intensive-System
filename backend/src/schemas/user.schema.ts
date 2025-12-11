import { z } from "zod";

// GET /users
export const UserSchema = z.object({
  id: z.number().int(),

  email: z.email(),
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

export type User = z.infer<typeof UserSchema>;

// GET /users?email=
export const SearchSchema = z.object({
  email: z.coerce.string().trim().optional(),
  status: z.coerce.string().trim().optional(),
  role: z.coerce.string().trim().optional(),
});

export type SearchQuery = z.infer<typeof SearchSchema>;
