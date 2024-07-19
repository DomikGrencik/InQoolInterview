import { useQuery } from "@tanstack/react-query";
import { animalSchema } from "@utils/dataSchemas";
import { API_ROUTE_BASE } from "@utils/variables";
import { z } from "zod";

const fetchAnimals = async () => {
  const response = await fetch(`${API_ROUTE_BASE}animals`, { method: "GET" });
  const json = await response.json();

  return z.array(animalSchema).parse(json);
};

const useFetchAnimals = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["animals"],
    queryFn: fetchAnimals,
  });

  return { data, error, isLoading };
};

export default useFetchAnimals;
