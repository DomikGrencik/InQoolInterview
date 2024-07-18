import { UserFormData } from "@components/form/form-types";
import { useMutation } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const usePatchUser = (id: string) => {
  const {
    mutateAsync: patchUser,
    data,
    isSuccess,
  } = useMutation({
    mutationFn: async (values: UserFormData) => {
      const response = await fetch(`${API_ROUTE_BASE}users/${id}`, {
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
      console.log("User edited successfully:", data);
    },
    onError: (error) => {
      console.error("Error editing user:", error.message);
    },
  });

  return { patchUser, data, isSuccess };
};

export default usePatchUser;
