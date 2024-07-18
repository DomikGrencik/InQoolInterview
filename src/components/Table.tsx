import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { userSchema } from "@utils/dataSchemas";
import { FC, useEffect, useState } from "react";
import { z } from "zod";
import Modal from "./Modal";
import useDeleteUser from "@utils/hooks/useDeleteUser";
import usePatchUser from "@utils/hooks/usePatchUser";

interface TableProps {
  data: z.infer<typeof userSchema>[];
  error?: Error;
  isLoading: boolean;
}

const Table: FC<TableProps> = ({ data, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rowData, setRowData] = useState<z.infer<typeof userSchema>>({
    id: "",
    name: "",
    gender: "other",
    banned: false,
  });

  const [resolvedData, setResolvedData] =
    useState<z.infer<typeof userSchema>[]>(data);

  const { patchUser, data: patchedData, isSuccess } = usePatchUser(rowData.id);

  console.log(patchedData);

  const handlePatch = async (userData: z.infer<typeof userSchema>) => {
    try {
      await patchUser(userData);
    } catch (error) {
      console.error("Failed to patch user:", error);
    }
  };

  const deteteUser = useDeleteUser(rowData.id);

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

  useEffect(() => {
    if (isSuccess && patchedData) {
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === patchedData.id ? patchedData : row))
      );
    }
  }, [isSuccess, patchedData]);

  const table = useReactTable({
    columns,
    data: resolvedData,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
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
                              id="filter"
                              type="text"
                              value={(() => {
                                const value = header.column.getFilterValue();
                                return typeof value === "string" ? value : "";
                              })()}
                              onChange={(e) =>
                                header.column.setFilterValue(e.target.value)
                              }
                            />
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
                          setRowData(row.original);
                          handlePatch({
                            ...row.original,
                            banned: !row.original.banned,
                          });
                        }}
                      >
                        {row.original.banned ? "unban" : "ban"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          setRowData(row.original);
                        }}
                      >
                        edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setRowData(row.original);
                          deteteUser();
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        data={rowData}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export default Table;
