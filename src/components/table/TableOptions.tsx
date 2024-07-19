import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { animalSchema, userSchema } from "@utils/dataSchemas";
import { z } from "zod";

const userColumnHelper = createColumnHelper<z.infer<typeof userSchema>>();

export const userColumns: ColumnDef<z.infer<typeof userSchema>, any>[] = [
  userColumnHelper.accessor("id", {
    header: "ID",
    enableColumnFilter: false,
  }),
  userColumnHelper.accessor("name", {
    header: "Name",
  }),
  userColumnHelper.accessor("gender", {
    header: "Gender",
    enableColumnFilter: false,
  }),
  userColumnHelper.accessor("banned", {
    header: "Banned",
    enableColumnFilter: false,
  }),
];

const animalColumnHelper = createColumnHelper<z.infer<typeof animalSchema>>();

export const animalColumns = [
  animalColumnHelper.accessor("id", {
    header: "ID",
    enableColumnFilter: false,
  }),
  animalColumnHelper.accessor("name", {
    header: "Name",
  }),
  animalColumnHelper.accessor("type", {
    header: "Type",
    enableColumnFilter: false,
  }),
  animalColumnHelper.accessor("age", {
    header: "Age",
    enableColumnFilter: false,
  }),
];
