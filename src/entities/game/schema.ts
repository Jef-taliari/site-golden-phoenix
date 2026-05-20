import { z } from "zod";
import { GameStatusSchema } from "./constants";

export const GameSchema = z.object({
  id: z.number(),
  homeTeamId: z.number(),
  awayTeamId: z.number(),
  date: z.string(),
  time: z.string(),
  venue: z.string(),
  homeLogo: z.string().optional(),
  awayLogo: z.string().optional(),
  status: GameStatusSchema,
});

export type Game = z.infer<typeof GameSchema>;