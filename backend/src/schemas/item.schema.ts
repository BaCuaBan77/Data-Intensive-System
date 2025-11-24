import { z } from "zod";

// POST /items
export const CreateItemSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.coerce.number(),
  picture: z.string().optional(),
  status: z.string(),

  category: z.number().int(),
  shop_id: z.number().int(),
});

export type CreateItemInput = z.infer<typeof CreateItemSchema>;

// GET /items?shop_id=
export const ItemSchema = z.object({
  id: z.number().int(),

  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  picture: z.string().nullable(),
  status: z.string(),

  category: z.string(),
  shop_id: z.number().int(),

  created_at: z.date(),
});

export type Item = z.infer<typeof ItemSchema>;

export const ItemFilterSchema = z.object({
  shop_id: z.coerce.number(),
});

export type ItemFilter = z.infer<typeof ItemFilterSchema>;

// PATCH /items/:id
export const UpdateItemSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.coerce.number().optional(),
  picture: z.string().optional(),
  status: z.string().optional(),

  category: z.number().int().optional(),
  shop_id: z.number().int().optional(),
});

export type UpdateItemInput = z.infer<typeof UpdateItemSchema>;
