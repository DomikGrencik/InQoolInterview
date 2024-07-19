import { useQuery } from "@tanstack/react-query";
import { z, ZodSchema } from "zod";
import { API_ROUTE_BASE } from "@utils/variables";

// Define the type for the schema parameter
const fetchRecords = async <T>(path: string, schema: ZodSchema<T>) => {
  const response = await fetch(`${API_ROUTE_BASE}${path}`, { method: "GET" });
  const json = await response.json();

  return z.array(schema).parse(json);
};

const useFetchRecords = <T>(
  path: string,
  queryKey: string,
  schema: ZodSchema<T>
) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchRecords(path, schema),
  });
};

export default useFetchRecords;
