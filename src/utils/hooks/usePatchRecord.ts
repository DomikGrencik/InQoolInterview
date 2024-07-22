import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const usePatchRecord = <T>(id: string, path: string, queryKey: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: patchRecord,
    data,
    variables,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (values: T) => {
      const response = await fetch(`${API_ROUTE_BASE}${path}${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error submitting form");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Record edited successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing user:", error.message);
      queryClient.invalidateQueries({ queryKey: [`${queryKey}${id}`] });
    },
  });

  return { patchRecord, data, isSuccess, variables, isPending, isError };
};

export default usePatchRecord;
