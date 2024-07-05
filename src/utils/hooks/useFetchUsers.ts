import { useQuery } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";
import { userSchema } from "@utils/dataSchemas";
import { z } from "zod";

const fetchUsers = async () => {
  const response = await fetch(`${API_ROUTE_BASE}users`, { method: "GET" });
  const json = await response.json();

  return z.array(userSchema).parse(json);
};

const useFetchUsers = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { data, error, isLoading };
};

export default useFetchUsers;
