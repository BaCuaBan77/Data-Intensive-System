import { z } from "zod";

// GET /categories
export const CategorySchema = z.object({
  id: z.number().int(),

  title: z.string(),
  description: z.string(),
});

export type Category = z.infer<typeof CategorySchema>;
