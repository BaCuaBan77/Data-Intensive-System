import { z } from "zod";
import { UserInfoSchema } from "./user.schema";

// POST /bans
export const CreateBanSchema = z.object({
  player_id: z.number().int(),
  admin_id: z.number().int(),

  reason: z.string()
    .min(1)
    .max(50),
  start_time: z.coerce.date(),
  end_time: z.coerce.date()
    .optional(),
});

export type CreateBanInput = z.infer<typeof CreateBanSchema>;

// GET /bans?user_id=
export const BanSchema = z.object({
  id: z.number().int(),

  player: UserInfoSchema,
  admin: UserInfoSchema,

  reason: z.string()
    .min(1)
    .max(50),
  start_time: z.date(),
  end_time: z.date()
    .nullable(),
});

export type Ban = z.infer<typeof BanSchema>;
