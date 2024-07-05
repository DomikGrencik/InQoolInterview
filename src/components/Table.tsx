import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { userSchema } from "@utils/dataSchemas";
import { FC, useState } from "react";
import { z } from "zod";
//import Input from "@components/Input";

interface TableProps {
  data: z.infer<typeof userSchema>[];
  error?: Error;
  isLoading: boolean;
}

const Table: FC<TableProps> = ({ data, isLoading }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columnHelper = createColumnHelper<z.infer<typeof userSchema>>();

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
                          <input
                            type="text"
                            value={(() => {
                              const value = header.column.getFilterValue();
                              return typeof value === "string" ? value : "";
                            })()}
                            onChange={(e) =>
                              header.column.setFilterValue(e.target.value)
                            }
                          />
                          {/* <Input column={header.column} /> */}
                          <button
                            onClick={() => header.column.setFilterValue("")}
                          >
                            X
                          </button>
                        </div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    background: row.original.banned ? "red" : "inherit",
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td>
                    <button
                      onClick={() => {
                        console.log("Banned user with ID", row.original);
                      }}
                    >
                      ban
                    </button>
                  </td>
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
