import { useQuery } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";
import { userSchema } from "@utils/dataSchemas";

const fetchUser = async (id: string) => {
  const response = await fetch(`${API_ROUTE_BASE}users/${id}`, {
    method: "GET",
  });
  const json = await response.json();

  return userSchema.parse(json);
};

const useFetchUser = (id?: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [`users/${id}`],
    queryFn: () => (id ? fetchUser(id) : null),
    enabled: !!id,
  });

  return { data, error, isLoading };
};

export default useFetchUser;
