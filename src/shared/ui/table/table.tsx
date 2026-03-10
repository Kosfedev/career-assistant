import React from 'react';
import {
  ColumnDef,
  flexRender, getCoreRowModel,
  HeaderGroup, Row, RowData, TableOptions, useReactTable,
} from '@tanstack/react-table';

const getTableHeadRows = (headerGroups: HeaderGroup<RowData>[]) =>
  headerGroups.map(headerGroup => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map(header => (
        <th key={header.id} className="px-1 py-2">
          {header.isPlaceholder
            ? null
            : flexRender(
              header.column.columnDef.header,
              header.getContext(),
            )}
        </th>
      ))}
    </tr>
  ));

const getTableBodyRows = (rows: Row<RowData>[]) =>
  rows.map((row, index) =>
    <tr key={row.id} className={index % 2 === 1 ? 'bg-dark-300' : ''}>
      {row.getVisibleCells().map(cell => {
        return (
          <td key={cell.id} className="px-1 py-2">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>,
  );

export function Table<T>({ data, columns = [] }: { data: T[]; columns: ColumnDef<T, any>[] }) {
  // TODO: разрулить типы более красиво
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  } as TableOptions<T>);
  const headRows = getTableHeadRows(table.getHeaderGroups() as HeaderGroup<RowData>[]);
  const bodyRows = getTableBodyRows(table.getRowModel().rows);

  return (
    <table className="w-full">
      <thead className="border-b-2">
      {headRows}
      </thead>
      <tbody>
      {bodyRows}
      </tbody>
    </table>
  );
}
