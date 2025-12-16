import { queryFromBothDbs } from "./database"
import { transactionSchema, Transaction } from "../schemas/transaction.schema";

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const sqlQuery = {
    text: `
      SELECT
        t.id,

        json_build_object(
          'id', u.id,
          'full_name', u.full_name
        ) AS player,

        json_build_object(
          'id', i.id,
          'name', i.name,
          'category', c.title
        ) AS purchased_item,

        t.price,
        cur.name AS currency,
        t.payment_id,
        t.created_at

      FROM transactions t
      JOIN users u ON u.id = t.player_id
      JOIN items i ON i.id = t.purchased_item_id
      JOIN categories c ON i.category = c.id
      JOIN currencies cur ON t.currency = cur.id;
      `,
    values: [],
  };

  return await queryFromBothDbs(sqlQuery, transactionSchema);
};
