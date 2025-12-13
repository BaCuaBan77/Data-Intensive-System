import { queryFromPrimary, queryToBothDbs } from "./database"
import { CreateItemInput, ItemSchema, Item, UpdateItemInput, ItemDeletedSchema, ItemDeleted } from "../schemas/item.schema";

export const getAllItems = async (shop_id: number): Promise<Item[]> => {
  // Get data only from Primary DB as it is identical in both
  const sqlQuery = {
    text: `
      SELECT i.id,
        i.name,
        i.description,
        i.price,
        i.picture,
        i.status,
        c.title as category,
        i.shop_id,    
        i.created_at
      FROM items i
      JOIN categories c ON c.id = i.category
      WHERE i.shop_id = $1 AND deleted = false
      ORDER BY i.id;
    `,
    values: [shop_id],
  };

  return await queryFromPrimary(sqlQuery, ItemSchema);
};

export const insertItem = async (body: CreateItemInput): Promise<Item> => {
  const sqlQuery = {
    text: `
      WITH inserted AS (
        INSERT INTO items (name, description, price, picture, status, category, shop_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      )
      SELECT i.id,
        i.name,
        i.description,
        i.price,
        i.picture,
        i.status,
        c.title as category,
        i.shop_id,    
        i.created_at
      FROM inserted i
      JOIN categories c ON c.id = i.category;
    `,
    values: [
      body.name,
      body.description,
      body.price,
      body.picture ?? null,
      body.status,
      body.category,
      body.shop_id
    ]
  };

  // Insert to Primary and Shard in one transaction
  try {
    return queryToBothDbs(sqlQuery, ItemSchema);
  } catch (err) {
    throw err;
  }
};

export const updateItem = async (id: number, body: UpdateItemInput): Promise<Item> => {
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;

  if (body.name !== undefined) {
    fields.push(`name = $${idx++}`);
    values.push(body.name);
  }
  if (body.description !== undefined) {
    fields.push(`description = $${idx++}`);
    values.push(body.description);
  }
  if (body.price !== undefined) {
    fields.push(`price = $${idx++}`);
    values.push(body.price);
  }
  if (body.picture !== undefined) {
    fields.push(`picture = $${idx++}`);
    values.push(body.picture ?? null);
  }
  if (body.status !== undefined) {
    fields.push(`status = $${idx++}`);
    values.push(body.status);
  }
  if (body.category !== undefined) {
    fields.push(`category = $${idx++}`);
    values.push(body.category);
  }
  if (body.shop_id !== undefined) {
    fields.push(`shop_id = $${idx++}`);
    values.push(body.shop_id);
  }

  values.push(id);

  const sqlQuery = {
    text: `
      WITH updated AS (
        UPDATE items
        SET ${fields.join(", ")}
        WHERE id = $${idx}
        RETURNING *
      )
      SELECT u.id,
        u.name,
        u.description,
        u.price,
        u.picture,
        u.status,
        c.title AS category,
        u.shop_id,
        u.created_at
      FROM updated u
      JOIN categories c ON c.id = u.category;
    `,
    values
  };

  // Update to Primary and Shard in one transaction
  try {
    return queryToBothDbs(sqlQuery, ItemSchema);
  } catch (err) {
    throw err;
  }
};

export const deleteItem = async (id: number): Promise<ItemDeleted> => {
  const sqlQuery = {
    text: `
      UPDATE items
      SET deleted = TRUE
      WHERE id = $1
      RETURNING id;
    `,
    values: [id]
  };

  // Update to Primary and Shard in one transaction
  try {
    return queryToBothDbs(sqlQuery, ItemDeletedSchema);
  } catch (err) {
    throw err;
  }
};
