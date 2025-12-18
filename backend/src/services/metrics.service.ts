import { queryFromBothDbs } from "./database";
import {
  MetricsRequest,
  DailyPlayersStatSchema,
  DailyPlayersStat,
  MonthlyPlayersStatSchema,
  MonthlyPlayersStat,
  DailyMatchesStatSchema,
  DailyMatchesStat,
  DailySalesStatSchema,
  DailySalesStat
} from "../schemas/metrics.schema";

const isDate = (value: unknown): value is Date => {
  return value instanceof Date;
}

// Generic merge function for statistics
// because we get data from primary and shard databases
const mergeStats = <
  T extends Record<string, any>,
  K extends keyof T,
  V extends readonly (keyof T)[]
>(
  data: T[],
  keyField: K,
  valueFields: V
): T[] => {
  const mergedMap = new Map<number | string, Partial<T>>();

  for (const row of data) {
    const rawKey = row[keyField];
    const key = isDate(rawKey) ? rawKey.getTime() : (rawKey as number | string);

    let target = mergedMap.get(key);

    if (!target) {
      target = { [keyField]: rawKey } as unknown as Partial<T>;
      mergedMap.set(key, target);
    }

    for (const field of valueFields) {
      const current = Number(target[field] ?? 0);
      const incoming = Number(row[field] ?? 0);
      target[field] = (current + incoming) as T[typeof field];
    }
  }

  return Array.from(mergedMap.values())
    .map((row) => {
      const value = row[keyField];
      return {
        ...row,
        [keyField]: isDate(value)
          ? value
          : new Date(value as number | string),
      } as T;
    })
    .sort((a, b) => {
      const aVal = isDate(a[keyField]) ? a[keyField].getTime() : Number(a[keyField]);
      const bVal = isDate(b[keyField]) ? b[keyField].getTime() : Number(b[keyField]);
      return aVal - bVal;
    });
};

export const calculateDailyPlayersStat = async (
  filters: MetricsRequest
): Promise<DailyPlayersStat[]> => {
  const { interval, start_date } = filters;

  const sqlQuery = {
    text: `
      WITH days AS (
        SELECT generate_series(
          $1::date,
          $1::date + ($2 - 1) * INTERVAL '1 day',
          INTERVAL '1 day'
        )::date AS day
      ),
      players AS (
        SELECT start_time::date AS day, player_white AS player_id FROM matches
        UNION ALL
        SELECT start_time::date AS day, player_black AS player_id FROM matches
      )
      SELECT
        d.day,
        COUNT(DISTINCT p.player_id) AS unique_players
      FROM days d
      LEFT JOIN players p ON p.day = d.day
      GROUP BY d.day
      ORDER BY d.day;
    `,
    values: [start_date, interval],
  };

  const data = await queryFromBothDbs(sqlQuery, DailyPlayersStatSchema);
  const merged = mergeStats(data, "day", ["unique_players"]);

  return merged;
};

export const calculateMonthlyPlayersStat = async (
  filters: MetricsRequest
): Promise<MonthlyPlayersStat[]> => {
  const { interval, start_date } = filters;

  const sqlQuery = {
    text: `
      WITH months AS (
        -- Generate the first day of each month in the interval
        SELECT generate_series(
          date_trunc('month', $1::date),
          date_trunc('month', $1::date) + ($2 - 1) * INTERVAL '1 month',
          INTERVAL '1 month'
        )::date AS month_start
      ),
      players AS (
        SELECT date_trunc('month', start_time)::date AS month_start, player_white AS player_id
        FROM matches
        UNION ALL
        SELECT date_trunc('month', start_time)::date AS month_start, player_black AS player_id
        FROM matches
      )
      SELECT
        m.month_start,
        COUNT(DISTINCT p.player_id)::int AS unique_players
      FROM months m
      LEFT JOIN players p ON p.month_start = m.month_start
      GROUP BY m.month_start
      ORDER BY m.month_start;
    `,
    values: [start_date, interval],
  };

  const data = await queryFromBothDbs(sqlQuery, MonthlyPlayersStatSchema);
  const merged = mergeStats(data, "month_start", ["unique_players"]);

  return merged;
};

export const calculateDailyMatchesStat = async (
  filters: MetricsRequest
): Promise<DailyMatchesStat[]> => {
  const { interval, start_date } = filters;

  const sqlQuery = {
    text: `
      WITH days AS (
        SELECT generate_series(
          $1::date,
          $1::date + ($2 - 1) * INTERVAL '1 day',
          INTERVAL '1 day'
        )::date AS day
      )
      SELECT
        d.day,
        COUNT(m.id)::int AS matches
      FROM days d
      LEFT JOIN matches m
        ON m.start_time::date = d.day
      GROUP BY d.day
      ORDER BY d.day;
    `,
    values: [start_date, interval],
  };

  const data = await queryFromBothDbs(sqlQuery, DailyMatchesStatSchema);
  const merged = mergeStats(data, "day", ["matches"]);

  return merged;
};

export const calculateDailySalesStat = async (
  filters: MetricsRequest
): Promise<DailySalesStat[]> => {
  const { interval, start_date } = filters;

  const sqlQuery = {
    text: `
      WITH days AS (
        SELECT generate_series(
          $1::date,
          $1::date + ($2 - 1) * INTERVAL '1 day',
          INTERVAL '1 day'
        )::date AS day
      ),
      daily_sales AS (
        SELECT
          created_at::date AS day,
          COUNT(*) AS sales_count,
          SUM(price) AS total_sales
        FROM transactions
        GROUP BY created_at::date
      )
      SELECT
        d.day,
        COALESCE(ds.sales_count, 0) AS sales_count,
        COALESCE(ds.total_sales, 0) AS total_sales
      FROM days d
      LEFT JOIN daily_sales ds ON ds.day = d.day
      ORDER BY d.day;
    `,
    values: [start_date, interval],
  };

  const data = await queryFromBothDbs(sqlQuery, DailySalesStatSchema);
  const merged = mergeStats(data, "day", ["sales_count", "total_sales"]);

  return merged;
};
