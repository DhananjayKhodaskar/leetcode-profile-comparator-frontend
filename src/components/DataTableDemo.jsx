"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ExternalLink,
  RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useUpdateUserProgressByAutomaticallyMutation,
  useUpdateUserProgressManuallyMutation,
} from "@/services/challenge";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export function DataTableDemo({
  data,
  activeChallengeId,
  refetchProblems,
  refetchActiveChallengeDetails,
  problemsFetching,
}) {
  // State to manage the rows (if needed for your hooks logic)
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [updateUserProgressManually, { isLoading, isSuccess, isError, error }] =
    useUpdateUserProgressManuallyMutation();
  const [
    updateUserProgressByAutomatically,
    { isLoading: autoProblemUpdateLoading },
  ] = useUpdateUserProgressByAutomaticallyMutation();

  const handleCheckboxClick = async (row) => {
    if (!row?.original.method || row?.original.method === "manual") {
      console.log(row.original, "rowData", row?.original.method);
      try {
        await updateUserProgressManually({
          activeChallengeId,
          problemSlug: row.original.titleSlug,
        });
        refetchProblems();
        refetchActiveChallengeDetails();
        console.log("Progress updated successfully");
      } catch (err) {
        console.error("Failed to update progress:", err);
      }
    }
  };

  const handleAutoSync = async () => {
    await updateUserProgressByAutomatically(activeChallengeId);
    refetchProblems();
  };

  // Columns definition including the handler function
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "solved",
        id: "solvedCheckbox",
        header: "Solved",
        cell: ({ row }) => {
          return (
            <Checkbox
              checked={row.original.solved}
              readOnly
              disabled={
                !(!row?.original.method || row?.original.method === "manual")
              }
              onClick={() => handleCheckboxClick(row)} // Use the handler function here
            />
          ); // Read-only checkbox
        },
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div>
              <a
                href={row.original.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row gap-2 items-center"
              >
                <span className="group-hover:underline ">
                  {row.original.title}
                </span>
                <ExternalLink className="h-4 w-4 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            </div>
          );
        },
      },
      {
        accessorKey: "difficulty",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Difficulty
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const difficulty = row.getValue("difficulty");
          const difficultyClass = {
            Easy: "bg-green-800",
            Medium: "bg-yellow-500",
            Hard: "bg-red-600",
          };

          return (
            <Badge
              className={`text-center ${difficultyClass[difficulty]} white`}
            >
              {difficulty}
            </Badge>
          );
        },
        sortingFn: (rowA, rowB) => {
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return (
            difficultyOrder[rowA.getValue("difficulty")] -
            difficultyOrder[rowB.getValue("difficulty")]
          );
        },
      },
      {
        id: "method",
        header: "Method",
        cell: ({ row }) => {
          const method = row.original.method
            ? row.original.method.charAt(0).toUpperCase() +
              row.original.method.slice(1)
            : "-";
          return <div className="text-center">{method}</div>;
        },
      },
    ],
    [] // Dependency array should include any state used inside columns if needed
  );

  // Table instance creation
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex w-full flex-row justify-between py-4">
        <Input
          placeholder="Filter titles..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-xs "
        />
        <Button
          className={`gap-1`}
          onClick={handleAutoSync}
          disabled={autoProblemUpdateLoading || problemsFetching}
        >
          <RefreshCcw
            className={`p-1 ${
              (autoProblemUpdateLoading || problemsFetching) && "animate-spin"
            }`}
          />{" "}
          Sync
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    row.original.solved ? "bg-green-100" : "",
                    "group"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
