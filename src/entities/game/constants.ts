import { z } from "zod";

export const GameStatusSchema = z.enum([
  'upcoming',
  'live',
  'finished',
]);

export type GameStatus = z.infer<typeof GameStatusSchema>;