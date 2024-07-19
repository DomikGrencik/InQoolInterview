import { UserFormData } from "@components/form/form-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_ROUTE_BASE } from "@utils/variables";

const usePostUser = () => {
    const queryCient = useQueryClient();

    const {mutateAsync: postUser} = useMutation({
        mutationFn: (values: UserFormData) => {
            return fetch(`${API_ROUTE_BASE}users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
        },
        onSuccess: () => {
            console.log("form submitted successfully");
            queryCient.invalidateQueries({queryKey: ["users"]});
        },
        onError: (error) => {
            console.error("error submitting form", error.message);
        },
    });

    return postUser;
};


export default usePostUser;
