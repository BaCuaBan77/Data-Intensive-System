import { queryFromBothDbs } from "./database"
import { matchSchema, Match } from "../schemas/match.schema";

export const getAllMatches = async (): Promise<Match[]> => {
  const sqlQuery = {
    text: `
      SELECT
        m.id,
        m.moves,
        m.result,

        json_build_object(
          'id', uw.id,
          'full_name', uw.full_name
        ) AS player_white,

        json_build_object(
          'id', ub.id,
          'full_name', ub.full_name
        ) AS player_black,

        CASE
          WHEN win.id IS NULL THEN NULL
          ELSE json_build_object(
            'id', win.id,
            'full_name', win.full_name
          )
        END AS winner,

        m.start_time,
        m.end_time,
        m.used_skins,
        m.rating_change_white,
        m.rating_change_black

      FROM matches m
      JOIN users uw ON uw.id = m.player_white
      JOIN users ub ON ub.id = m.player_black
      LEFT JOIN users win ON win.id = m.winner;
      `,
    values: [],
  };

  const data = await queryFromBothDbs(sqlQuery, matchSchema);

  return data.sort((a, b) => a.id - b.id);
};
