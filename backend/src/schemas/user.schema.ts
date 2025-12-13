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

// GET /users?email=&status=&role=
export const SearchSchema = z.object({
  email: z.coerce.string().trim().optional(),
  status: z.coerce.string().trim().optional(),
  role: z.coerce.string().trim().optional(),
});

export type SearchQuery = z.infer<typeof SearchSchema>;

// GET /get-database-name?user_id=
export const UserIdSchema = z.object({
  user_id: z.coerce.number(),
});

export type UserId = z.infer<typeof UserIdSchema>;

// User info for matches
export const UserInfoSchema = z.object({
  id: z.number().int(),
  full_name: z.string(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;
