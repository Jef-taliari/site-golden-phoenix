import teamsData from '@/content/teams/teams.json';
import { Team } from '@/entities/team/schema';

const base = import.meta.env.BASE_URL ?? '/';

export function getTeamById(id: number): Team | null {
  const team = (teamsData as Team[]).find(t => t.id === id);
  if (!team) return null;

  return {
    ...team,
    logo: `${base}${team.logo.replace(/^\//, '')}`,
  };
}
