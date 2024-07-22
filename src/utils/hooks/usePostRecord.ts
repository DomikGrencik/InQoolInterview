import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const usePostRecord = <T>(path: string, queryKey: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: postRecord,
    variables,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (values: T) => {
      const response = await fetch(`${API_ROUTE_BASE}${path}`, {
        method: "POST",
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
    onSuccess: () => {
      console.log("Form submitted successfully");
    },
    onError: (error) => {
      console.error("Error submitting form", error.message);
    },
    onSettled: () => {
      console.log("Form submission completed");
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { postRecord, variables, isPending, isError };
};

export default usePostRecord;
