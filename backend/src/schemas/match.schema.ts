import { z } from "zod";
import { UserInfoSchema } from "./user.schema";

// GET /matches
export const matchSchema = z.object({
  id: z.number().int(),

  moves: z.any(),
  result: z.enum(["white_wins", "black_wins", "draw"]),
  player_white: UserInfoSchema,
  player_black: UserInfoSchema,
  winner: UserInfoSchema.nullable(),

  start_time: z.date(),
  end_time: z.date(),
  used_skins: z.any(),
  rating_change_white: z.number(),
  rating_change_black: z.number(),
});

export type Match = z.infer<typeof matchSchema>;
