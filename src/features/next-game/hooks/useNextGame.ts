import { useEffect, useState } from 'react';
import { getNextGame } from '@/app/services/games/getNextGame';
import { getTeamById } from '@/app/services/teams/getTeam';
import type { Game } from '@/entities/game/schema';
import type { Team } from '@/entities/team/schema';

export interface NextGameData {
  game: Game;
  homeTeam: Team;
  awayTeam: Team;
}

export function useNextGame(): NextGameData | null {
  const [data, setData] = useState<NextGameData | null>(null);

  useEffect(() => {
    async function load() {
      const game = await getNextGame();
      if (!game) return;

      const homeTeam = getTeamById(game.homeTeamId);
      const awayTeam = getTeamById(game.awayTeamId);
      if (!homeTeam || !awayTeam) return;

      setData({ game, homeTeam, awayTeam });
    }
    load();
  }, []);

  return data;
}