import { AnimalFormData } from "@components/form/form-types";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const usePatchAnimal = (id: string) => {
  const {
    mutateAsync: patchAnimal,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: async (values: AnimalFormData) => {
      const response = await fetch(`${API_ROUTE_BASE}animals/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Animal edited successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing animal:", error.message);
    },
  });

  return { patchAnimal, data, isSuccess };
};

export default usePatchAnimal;
