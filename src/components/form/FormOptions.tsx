import { formOptions } from "@tanstack/react-form";
import { AnimalFormData, UserFormData } from "./form-types";

export const userFormOpts = formOptions<UserFormData>({
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
    validation: {
      type: "required",
      message: "Name is required",
    },
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
  },
];

export const animalFormOpts = formOptions<AnimalFormData>({
  defaultValues: {
    name: "",
    type: "other",
    age: 0,
  },
});

export const animalFormFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    validation: {
      type: "required",
      message: "Name is required",
    },
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: ["cat", "dog", "other"],
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    validation: {
      type: "required",
      message: "Age is required",
    },
  },
];
