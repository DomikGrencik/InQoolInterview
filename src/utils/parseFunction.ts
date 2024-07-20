import { ZodBoolean, ZodNumber, ZodSchema, ZodString } from "zod";

export const parseFunction = <T>(data: T, schema: ZodSchema<T>) => {
  console.log(data);

  const parsedData = { ...data };

  const schemaShape = schema.shape;

  for (const key in schemaShape) {
    if (schemaShape[key] instanceof ZodNumber) {
      parsedData[key] = Number(data[key]);
    } else if (schemaShape[key] instanceof ZodString) {
      parsedData[key] = String(data[key]);
    } else if (schemaShape[key] instanceof ZodBoolean) {
      parsedData[key] = data[key] === "true" || data[key] === true;
    }
    // Add more type conversions if needed
  }

  // Validate using the schema
  const result = schema.safeParse(parsedData);

  console.log(result);

  if (result.success) {
    return result.data;
  } else {
    throw new Error(JSON.stringify(result.error.errors));
  }
};
