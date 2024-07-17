import { UserFormData } from "@components/form/form-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const usePatchUser = (id: string) => {
  const queryCient = useQueryClient();

  const { mutateAsync: patchUser } = useMutation({
    mutationFn: (values: UserFormData) => {
      return fetch(`${API_ROUTE_BASE}users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
    onSuccess: () => {
      console.log("user edited successfully");
      queryCient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("error edditing user", error.message);
    },
  });

  return patchUser;
};

export default usePatchUser;
