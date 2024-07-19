import { createColumnHelper } from "@tanstack/react-table";
import { animalSchema, userSchema } from "@utils/dataSchemas";
import { z } from "zod";

const columnHelper = createColumnHelper<z.infer<typeof userSchema> | z.infer<typeof animalSchema>>();

export const userColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    enableColumnFilter: false,
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    enableColumnFilter: false,
  }),
  columnHelper.accessor("banned", {
    header: "Banned",
    enableColumnFilter: false,
  }),
];

export const animalColumns = [
  columnHelper.accessor("id", {
    header: "ID",
    enableColumnFilter: false,
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("type", {
    header: "Type",
    enableColumnFilter: false,
  }),
  columnHelper.accessor("age", {
    header: "Age",
    enableColumnFilter: false,
  }),
];
