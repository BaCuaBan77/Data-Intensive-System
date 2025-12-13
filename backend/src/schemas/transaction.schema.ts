import { z } from "zod";
import { UserInfoSchema } from "./user.schema";
import { ItemInfoSchema } from "./item.schema";

// GET /transactions
export const transactionSchema = z.object({
  id: z.number().int(),

  player: UserInfoSchema, // Adding user data
  purchased_item: ItemInfoSchema, // Adding all the item data
  price: z.coerce.number(),
  currency: z.string(),
  payment_id: z.number().int(),
  created_at: z.date(),
});

export type Transaction = z.infer<typeof transactionSchema>;
