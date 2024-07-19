import { useQuery } from "@tanstack/react-query";
import { animalSchema } from "@utils/dataSchemas";
import { API_ROUTE_BASE } from "@utils/variables";

const fetchAnimal = async (id: string) => {
  const response = await fetch(`${API_ROUTE_BASE}animals/${id}`, {
    method: "GET",
  });
  const json = await response.json();

  return animalSchema.parse(json);
};

const useFetchAnimal = (id: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [`animals/${id}`],
    queryFn: () => fetchAnimal(id),
    enabled: !!id,
  });

  return { data, error, isLoading };
};

export default useFetchAnimal;
