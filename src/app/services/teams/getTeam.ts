import teamsData from '@/content/teams/teams.json';
import { Team } from '@/entities/team/schema';

export function getTeamById(id: number): Team | null {
  return (teamsData as Team[]).find(team => team.id === id) ?? null;
}