import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const useDeleteAnimal = (id: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteAnimal } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_ROUTE_BASE}animals/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    },
    onSuccess: () => {
      console.log("Deleted animal");
      queryClient.invalidateQueries({ queryKey: ["animals"] });
    },
    onError: (error) => {
      console.error("error:", error.message);
    },
  });

  return deleteAnimal;
};

export default useDeleteAnimal;
