import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableProps<T> {
  data: T[];
  isLoading: boolean;
  columns: ColumnDef<T, unknown>[];
  actions?: {
    ban?: (rowData: T) => void;
    edit?: (rowData: T) => void;
    delete?: (rowData: T) => void;
  };
}

const Table = <T extends { banned?: boolean }>({
  data,
  isLoading,
  columns,
  actions,
}: TableProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
    <>
      <div>
        {isLoading ? (
          <div className="loading">
            {[...Array(10)].map((_, index) => (
              <div className="loader" key={index} />
            ))}
          </div>
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
                    {actions && (
                      <th colSpan={Object.keys(actions).length}>Actions</th>
                    )}
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
                    {actions && (
                      <>
                        {actions.ban && (
                          <td className="td-action">
                            <Tooltip
                              title={row.original.banned ? "Unban" : "Ban"}
                            >
                              <IconButton
                                sx={{
                                  color: row.original.banned
                                    ? "red"
                                    : "inherit",
                                }}
                                aria-label="ban"
                                onClick={() => actions.ban!(row.original)}
                              >
                                <BlockIcon />
                              </IconButton>
                            </Tooltip>
                          </td>
                        )}
                        {actions.edit && (
                          <td className="td-action">
                            <Tooltip title="Edit">
                              <IconButton
                                sx={{ color: "inherit" }}
                                aria-label="edit"
                                onClick={() => actions.edit!(row.original)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </td>
                        )}
                        {actions.delete && (
                          <td className="td-action">
                            <Tooltip title="Delete">
                              <IconButton
                                sx={{ color: "inherit" }}
                                aria-label="delete"
                                onClick={() => actions.delete!(row.original)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </td>
                        )}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
