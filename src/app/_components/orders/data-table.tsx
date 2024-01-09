"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  DownloadIcon,
  EyeNoneIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Table as TanStackTable,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showPagination?: boolean;
  showViewControls?: boolean;
  filterColumn?: ColumnName<TData>;
  onRowSelectStateChange?: (rowSelection: Record<string, boolean>) => void;
}

type ColumnName<TData> = keyof TData;

export function DataTable<TData, TValue>({
  columns,
  data,
  showPagination,
  showViewControls,
  filterColumn,
  onRowSelectStateChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
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

  React.useEffect(
    () => onRowSelectStateChange?.(rowSelection),
    [onRowSelectStateChange, rowSelection]
  );

  return (
    <div className="rounded-md border bg-white w-full">
      {showViewControls && (
        <div className="flex justify-end mb-2 p-2">
          {filterColumn && (
            <Input
              placeholder="Search Order IDs"
              className="w-64"
              value={
                (table
                  .getColumn(String(filterColumn))
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table
                  .getColumn(String(filterColumn))
                  ?.setFilterValue(e.target.value)
              }
            />
          )}

          <DataTableViewOptions table={table} />
          <Button
            variant="outline"
            size="sm"
            className="hidden h-8 lg:flex ml-2"
          >
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      )}

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
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {showPagination && (
        <div className="py-2">
          <DataTablePagination table={table} />
        </div>
      )}
    </div>
  );
}

interface DataTablePaginationProps<TData> {
  table: TanStackTable<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-center px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  isActive={table.getCanPreviousPage()}
                />
              </PaginationItem>
              {table.getState().pagination.pageIndex > 1 && (
                <PaginationItem className="cursor-pointer">
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {table.getState().pagination.pageIndex === 1 && (
                <PaginationItem className="cursor-pointer">
                  <PaginationLink onClick={() => table.previousPage()}>
                    {table.getState().pagination.pageIndex}
                  </PaginationLink>
                </PaginationItem>
              )}
              {table.getState().pagination.pageIndex >= 2 && (
                <PaginationItem className="cursor-pointer">
                  <PaginationLink onClick={() => table.previousPage()}>
                    {table.getState().pagination.pageIndex}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem className="cursor-pointer">
                <PaginationLink isActive>
                  {table.getState().pagination.pageIndex + 1}
                </PaginationLink>
              </PaginationItem>
              {table.getState().pagination.pageIndex <
                table.getPageCount() - 2 && (
                <PaginationItem className="cursor-pointer">
                  <PaginationLink onClick={() => table.nextPage()}>
                    {table.getState().pagination.pageIndex + 2}
                  </PaginationLink>
                </PaginationItem>
              )}
              {table.getState().pagination.pageIndex <
                table.getPageCount() - 3 && (
                <PaginationItem className="cursor-pointer">
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {table.getState().pagination.pageIndex ===
                table.getPageCount() - 2 && (
                <PaginationItem className="cursor-pointer">
                  <PaginationLink onClick={() => table.nextPage()}>
                    {table.getPageCount()}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem className="cursor-pointer">
                <PaginationNext
                  onClick={() => table.nextPage()}
                  isActive={table.getCanNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface DataTableViewOptionsProps<TData> {
  table: TanStackTable<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
