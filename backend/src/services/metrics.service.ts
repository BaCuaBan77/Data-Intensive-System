import { queryFromBothDbs } from "./database";
import {
  MetricsRequest,
  DailyPlayersStatSchema,
  DailyPlayersStat,
  MonthlyPlayersStatSchema,
  MonthlyPlayersStat
} from "../schemas/metrics.schema";

const isDate = (value: unknown): value is Date => {
  return value instanceof Date;
}

// Generic merge function for statistics
// because we get data from primary and shard databases
const mergeStats = <
  T extends Record<string, any>,
  K extends keyof T,
  V extends keyof T
>(
  data: T[],
  keyField: K,
  valueField: V
): T[] => {
  const mergedMap = new Map<any, number>();

  data.forEach((row) => {
    const key = isDate(row[keyField]) ? row[keyField].getTime() : row[keyField];
    const current = mergedMap.get(key) || 0;
    mergedMap.set(key, current + Number(row[valueField]));
  });

  return Array.from(mergedMap.entries())
    .map(([key, value]) => {
      const row: any = { [keyField]: typeof key === "number" ? new Date(key) : key };
      row[valueField] = value;
      return row as T;
    })
    .sort((a, b) => {
      const aVal = isDate(a[keyField]) ? a[keyField].getTime() : a[keyField];
      const bVal = isDate(b[keyField]) ? b[keyField].getTime() : b[keyField];
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
  const merged = mergeStats(data, "day", "unique_players");

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
          date_trunc('month', $1::date) + ($2 - 1) * INTERVAL '1 month',  -- number of months
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
  const merged = mergeStats(data, "month_start", "unique_players");

  return merged;
};
