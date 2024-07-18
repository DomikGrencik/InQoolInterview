import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteUser } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_ROUTE_BASE}users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    },
    onSuccess: () => {
      console.log("Deleted user");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("error:", error.message);
    },
  });

  return deleteUser;
};

export default useDeleteUser;
