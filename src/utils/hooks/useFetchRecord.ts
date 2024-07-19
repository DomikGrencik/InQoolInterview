import { useQuery } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";
import { ZodSchema } from "zod";

const fetchRecord = async <T>(id: string, path: string, schema: ZodSchema<T>) => {
  const response = await fetch(`${API_ROUTE_BASE}${path}${id}`, {
    method: "GET",
  });
  const json = await response.json();

  return schema.parse(json);
};

const useFetchRecord = <T>(
  id: string,
  path: string,
  queryKey: string,
  schema: ZodSchema<T>
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [`${queryKey}${id}`],
    queryFn: () => fetchRecord(id, path, schema),
    enabled: !!id,
  });

  return { data, error, isLoading };
};

export default useFetchRecord;
