import { z } from "zod";

// POST /items
export const createItemSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.coerce.number(),
  picture: z.string().optional(),
  status: z.string(),

  category: z.number().int(),
  shop_id: z.number().int(),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;

// GET /items
export const itemSchema = z.object({
  id: z.number().int(),

  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  picture: z.string().nullable(),
  status: z.string(),

  category: z.number().int(),
  shop_id: z.number().int(),

  created_at: z.iso.datetime(),
});

export type Item = z.infer<typeof itemSchema>;

// PATCH /items/:id
export const updateItemSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  picture: z.string().optional(),
  status: z.string().optional(),

  category: z.number().int().optional(),
  shop_id: z.number().int().optional(),
});

export type UpdateItemInput = z.infer<typeof updateItemSchema>;
