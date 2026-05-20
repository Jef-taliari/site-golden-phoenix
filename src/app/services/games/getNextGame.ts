import gamesData from '@/content/games/games.json';
import { Game } from '@/entities/game/schema';

export async function getNextGame(): Promise<Game | null> {
  const now = new Date();

  const upcoming = (gamesData as Game[])
    .filter(game => new Date(game.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcoming.length === 0) return null;

  const next = upcoming[0];
  return { ...next, status: 'upcoming' };
}