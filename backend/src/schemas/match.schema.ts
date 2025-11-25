import { z } from "zod";

// GET /matches
export const matchSchema = z.object({
  id: z.number().int(),

  moves: z.any(),
  result: z.string(),
  player_white: z.number().int(),
  player_black: z.number().int(),
  winner: z.number().int(),

  start_time: z.iso.datetime(),
  end_time: z.iso.datetime(),
  used_skins: z.any(),
  rating_change_white: z.number(),
  rating_change_black: z.number(),
});

export type Match = z.infer<typeof matchSchema>;
