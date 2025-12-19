import {
  type ColumnDef,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { formatDateExtended } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp, ArrowUpDown, X } from "lucide-react";
import { formatCurrency } from "@/utils/formatCurrency";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

const DEFAULT_SORTING: SortingState = [{ id: "timestamp", desc: true }];

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="max-h-full overflow-auto flex flex-col rounded-md border border-input">
      <DataTableToolbar table={table} />
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background shadow-m">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-input">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-(--text-gray)">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                className="border-input"
                key={row.id}
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
    </div>
  );
}

const globalFilterFn: FilterFn<any> = (row, _, value) => {
  const search = value.toLowerCase().trim();
  const { timestamp, txnId, amount, remarks, accountNumber, status, type } =
    row.original;

  if (search === "-") return type === "DEBIT";
  if (search === "+") return type === "CREDIT";

  if (search === "debit") return type === "DEBIT";
  if (search === "credit") return type === "CREDIT";

  const formattedAmount =
    (type === "DEBIT" ? "-" : "+") + formatCurrency(amount);

  return (
    String(txnId).toLowerCase().includes(search) ||
    String(accountNumber).toLowerCase().includes(search) ||
    String(remarks).toLowerCase().includes(search) ||
    String(status).toLowerCase().includes(search) ||
    formattedAmount.toLowerCase().includes(search) ||
    formatDateExtended(timestamp).toLowerCase().includes(search)
  );
};

function DataTableToolbar({ table }: { table: any }) {
  const sorting = table.getState().sorting;
  const activeSort = sorting[0];

  const toggleSortDirection = () => {
    if (!activeSort) {
      table.setSorting([{ id: "timestamp", desc: false }]);
      return;
    }

    table.setSorting([
      {
        id: activeSort.id,
        desc: !activeSort.desc,
      },
    ]);
  };

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-3 p-3">
      <div className="flex gap-3">
        <Select
          value={activeSort?.id ?? ""}
          onValueChange={(value) =>
            table.setSorting([
              {
                id: value,
                desc: activeSort?.desc ?? false,
              },
            ])
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
            {table
              .getAllLeafColumns()
              .filter((col: any) => col.getCanSort())
              .map((column: any) => (
                <SelectItem key={column.id} value={column.id}>
                  {typeof column.columnDef.header === "string"
                    ? column.columnDef.header
                    : column.id}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSortDirection}
          disabled={!activeSort}
          title="Toggle sort direction"
          className="border-input"
        >
          {!activeSort ? (
            <ArrowUpDown className="h-4 w-4" />
          ) : activeSort.desc ? (
            <ArrowDown className="h-4 w-4" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      </div>
      <Input
        placeholder="Search transactions, debit, credit"
        value={table.getState().globalFilter ?? ""}
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />
      {!(
        table.getState().sorting[0]?.id === "timestamp" &&
        table.getState().sorting[0]?.desc
      ) && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log(table.getState().sorting[0].desc);
            table.setSorting(DEFAULT_SORTING);
            table.resetGlobalFilter();
          }}
          className="border-input"
        >
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
      )}
    </div>
  );
}
