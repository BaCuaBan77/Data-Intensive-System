import { queryFromBothDbs } from "./database";
import { MetricsRequest, DailyPlayersStatSchema, DailyPlayersStat } from "../schemas/metrics.schema";

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
  const mergedDaily = mergeStats(data, "day", "unique_players");

  return mergedDaily;
};
