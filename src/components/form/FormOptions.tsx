import { formOptions } from "@tanstack/react-form";
import { UserFormData } from "./form-types";

export const usersFormOpts = formOptions<UserFormData>({
  defaultValues: {
    name: "",
    gender: "other",
    banned: false,
  },
});
