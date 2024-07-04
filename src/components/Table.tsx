import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { dataSchemaUsers } from "@utils/dataSchemas";
import { FC, useState } from "react";
import { z } from "zod";
import Input from "@components/Input";

interface TableProps {
  data: z.infer<typeof dataSchemaUsers>;
  error?: Error;
  isLoading: boolean;
}

const Table: FC<TableProps> = ({ data, isLoading }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columnHelper = createColumnHelper<z.infer<typeof dataSchemaUsers>>();

  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      enableColumnFilter: false,
    }),
    columnHelper.accessor("name", {
      header: "Name",
      filterFn: "includesString",
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

  const table = useReactTable({
    columns,
    data,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                      {header.column.getCanFilter() ? (
                        <div>
                          <Input column={header.column} />
                        </div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
