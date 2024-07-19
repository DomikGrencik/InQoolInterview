import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const useDeleteRecord = (id: string, path: string, queryKey: string) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteRecord } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_ROUTE_BASE}${path}${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete record");
      }
      return response.json();
    },
    onSuccess: () => {
      console.log("Deleted record");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onError: (error) => {
      console.error("error:", error.message);
    },
  });

  return deleteRecord;
};

export default useDeleteRecord;
