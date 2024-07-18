import { formOptions } from "@tanstack/react-form";
import { UserFormData } from "./form-types";

export const usersFormOpts = formOptions<UserFormData>({
  defaultValues: {
    name: "",
    gender: "other",
    banned: false,
  },
});

export const userFormFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["female", "male", "other"],
  },
  {
    name: "banned",
    label: "Banned",
    type: "select",
    options: ["true", "false"],
    optionsType: "boolean",
  },
];
