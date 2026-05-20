import { z } from "zod";

export const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string(),
  city: z.string().optional(),
});

export type Team = z.infer<typeof TeamSchema>;
