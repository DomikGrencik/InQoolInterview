import { z } from "zod";

export const dataSchemaUsers = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    gender: z.enum(["female", "male", "other"]),
    banned: z.boolean(),
  })
);

export const dataSchemaAnimals = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(["cat", "dog", "other"]),
    age: z.number(),
  })
);