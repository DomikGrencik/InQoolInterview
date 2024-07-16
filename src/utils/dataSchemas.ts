import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  gender: z.enum(["female", "male", "other"]),
  banned: z.boolean(),
});

export const animalSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["cat", "dog", "other"]),
  age: z.number(),
});
