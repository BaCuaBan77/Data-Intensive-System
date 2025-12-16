import { z } from "zod";

// POST /items
export const CreateItemSchema = z.object({
  name: z.string()
    .min(1)
    .max(255),

  description: z.string()
    .max(255),

  price: z.coerce.number()
    .min(0),

  picture: z.string()
    .max(255)
    .optional(),

  status: z.enum(["available", "not_available"]),

  category: z.number()
    .int()
    .min(1)
    .max(30),

  shop_id: z.number()
    .int()  
    .min(1)
    .max(2),
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

// Item schema to expand a Transaction
export const ItemInfoSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  category: z.string(),
});

export type ItemInfo = z.infer<typeof ItemInfoSchema>;

export const ItemDeletedSchema = z.object({
  id: z.number().int(),
});

export type ItemDeleted = z.infer<typeof ItemDeletedSchema>;

// PATCH /items/:id
export const UpdateItemSchema = z.object({
  name: z.string()
    .min(1)
    .max(255)
    .optional(),

  description: z.string()
    .max(255)
    .optional(),

  price: z.coerce.number()
    .min(0)
    .optional(),

  picture: z.string()
    .max(255)
    .optional(),

  status: z.enum(["available", "not_available"]).optional(),

  category: z.number()
    .int()
    .min(1)
    .max(30)
    .optional(),

  shop_id: z.number()
    .int()  
    .min(1)
    .max(2)
    .optional(),
});

export type UpdateItemInput = z.infer<typeof UpdateItemSchema>;
