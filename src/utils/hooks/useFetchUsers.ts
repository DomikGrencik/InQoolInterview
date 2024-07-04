import { useQuery } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";
import { dataSchemaUsers } from "@utils/dataSchemas";

const fetchUsers = async () => {
  const response = await fetch(`${API_ROUTE_BASE}users`, { method: "GET" });
  const json = await response.json();

  return dataSchemaUsers.parse(json);
};

const useFetchUsers = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { data, error, isLoading };
};

export default useFetchUsers;
