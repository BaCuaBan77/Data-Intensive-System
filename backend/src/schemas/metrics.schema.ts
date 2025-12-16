import { z } from "zod";

// GET /api/metrics/daily-active-users?interval=[1,7]&start_date=
// GET /api/metrics/monthly-active-users?interval=[1,6]&start_date=
// GET /api/metrics/daily-matches?interval=[1,7]&start_date=
// GET /api/metrics/daily-sales?interval=[1,7]&start_date=
export const MetricsRequestSchema = z.object({
  interval: z.coerce.number()
    .int()
    .min(1),

  start_date: z.string().refine(
    (value) => {
      // Must be YYYY-MM-DD
      const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
      if (!isValidFormat) return false;

      // Must be a real date
      const date = new Date(value);
      return !Number.isNaN(date.getTime());
    },
    {
      message: "start_date must be a valid date in YYYY-MM-DD format",
    }
  ),
});

export type MetricsRequest = z.infer<typeof MetricsRequestSchema>;

export const DailyPlayersStatSchema = z.object({
  day: z.date(),
  unique_players: z.number().int(),
});

export type DailyPlayersStat = z.infer<typeof DailyPlayersStatSchema>;

export const MonthlyPlayersStatSchema = z.object({
  month_start: z.date(),
  unique_players: z.number().int(),
});

export type MonthlyPlayersStat = z.infer<typeof MonthlyPlayersStatSchema>;
