import { AnimalFormData } from "@components/form/form-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const usePostAnimal = () => {
  const queryCient = useQueryClient();

  const { mutateAsync: postAnimal } = useMutation({
    mutationFn: (values: AnimalFormData) => {
      return fetch(`${API_ROUTE_BASE}animals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      console.log("form submitted successfully");
      queryCient.invalidateQueries({ queryKey: ["animals"] });
    },
    onError: (error) => {
      console.error("error submitting form", error.message);
    },
  });

  return postAnimal;
};

export default usePostAnimal;
