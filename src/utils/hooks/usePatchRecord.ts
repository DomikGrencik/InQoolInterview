import { useMutation } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const usePatchRecord = <T>(id: string, path: string) => {
  const {
    mutateAsync: patchRecord,
    data,
    isSuccess,
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
    onSuccess: () => {
      console.log("Record edited successfully:");
    },
    onError: (error) => {
      console.error("Error editing user:", error.message);
    },
  });

  return { patchRecord, data, isSuccess };
};

export default usePatchRecord;
