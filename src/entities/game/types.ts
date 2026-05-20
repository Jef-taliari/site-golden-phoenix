import { GameStatus } from "./constants";

export interface Game {
  id: number;
  homeTeamId: number; // reference to Team.id
  awayTeamId: number; // reference to Team.id
  date: string; // ISO YYYY-MM-DD
  time: string; // HH:mm (24h)
  venue: string;
  homeLogo?: string; // optional, can be derived from team data
  awayLogo?: string;
  status: GameStatus;
}
