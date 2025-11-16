import { z } from "zod";

// GET /transactions
export const transactionSchema = z.object({
  id: z.number().int(),

  player_id: z.number().int(),
  purchased_item_id: z.number().int(),
  price: z.coerce.number(),
  currency: z.number().int(),
  payment_id: z.number().int(),
  created_at: z.iso.datetime(),
});

export type Transaction = z.infer<typeof transactionSchema>;
