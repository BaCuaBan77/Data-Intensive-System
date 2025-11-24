import { z } from "zod";

// GET /shops
export const ShopSchema = z.object({
  id: z.number().int(),

  type: z.string(),
  name: z.string(),
});

export type Shop = z.infer<typeof ShopSchema>;
