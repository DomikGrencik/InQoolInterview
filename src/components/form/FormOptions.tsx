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
    validation: (value: unknown) => {
      if (!value) {
        return "Name is required";
      }
      if (typeof value !== "string") {
        return "Name must be a string";
      }
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
    type: "checkbox",
  },
];

export const animalFormOpts = formOptions<AnimalFormData>({
  defaultValues: {
    name: "",
    type: "other",
    age: "",
  },
});

export const animalFormFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    validation: (value: unknown) => {
      if (!value) {
        return "Name is required";
      }
      if (typeof value !== "string") {
        return "Name must be a string";
      }
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
    validation: (value: unknown) => {
      if (!value) {
        return "Age is required";
      }
      if (typeof value !== "number") {
        return "Age must be a number";
      }
      if (value < 0) {
        return "Age must be a positive number";
      }
      if (value > 30) {
        return "Age must be less than 30";
      }
    },
  },
];
