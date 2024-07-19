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
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from "./Modal";
import useDeleteUser from "@utils/hooks/useDeleteUser";
import usePatchUser from "@utils/hooks/usePatchUser";
import useFetchUser from "@utils/hooks/useFetchUser";
import { IconButton, Tooltip } from "@mui/material";

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

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useFetchUser(rowData.id);

  const { patchUser, data: patchedData, isSuccess } = usePatchUser(rowData.id);

  const deteteUser = useDeleteUser(rowData.id);

  const handlePatch = async (userData: z.infer<typeof userSchema>) => {
    setRowData(userData);
    try {
      await patchUser(userData);
    } catch (error) {
      console.error("Failed to patch user:", error);
    }
  };

  const handleDelete = (userData: z.infer<typeof userSchema>) => {
    setRowData(userData);
    deteteUser();
  };

  const handleModal = (userData: z.infer<typeof userSchema>) => {
    setRowData(userData);
    setIsOpen(true);
  };

  useEffect(() => {
    setResolvedData(data);
  }, [data]);

  useEffect(() => {
    if (isSuccess && patchedData) {
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === patchedData.id ? patchedData : row))
      );
    }
  }, [isSuccess, patchedData]);

  useEffect(() => {
    if (userData && !userIsLoading) {
      setResolvedData((prevData) =>
        prevData.map((row) => (row.id === userData.id ? userData : row))
      );
    }
  }, [userData, userIsLoading]);

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
    data: resolvedData,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (userError) {
    console.error(userError.message);
    return null;
  }

  return (
    <>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="table-wrapper">
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
                  <tr className="tr-body" key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    <td>
                      <Tooltip title={row.original.banned ? "Unban" : "Ban"}>
                        <IconButton
                          sx={{
                            color: row.original.banned ? "red" : "inherit",
                          }}
                          aria-label="ban"
                          onClick={() => {
                            handlePatch({
                              ...row.original,
                              banned: !row.original.banned,
                            });
                          }}
                        >
                          <BlockIcon />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip title="Edit">
                        <IconButton
                          sx={{
                            color: "inherit",
                          }}
                          aria-label="edit"
                          onClick={() => {
                            handleModal(row.original);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </td>
                    <td>
                    <Tooltip title="Delete">
                        <IconButton
                          sx={{
                            color: "inherit",
                          }}
                          aria-label="delete"
                          onClick={() => {
                            handleDelete(row.original);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
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
