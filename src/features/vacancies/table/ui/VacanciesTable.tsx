import React, { useMemo } from 'react';
import {
  flexRender,
  getCoreRowModel,
  HeaderGroup, Row, RowData,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';

import { TVacancyOverview } from '@/entities/vacancies';
import { useTableColumns } from '../model/columns-config';

const useTableHeadRows = (headerGroups: HeaderGroup<RowData>[]) =>
  useMemo(() =>
    headerGroups.map(headerGroup => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(header => (
          <th key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(
                header.column.columnDef.header,
                header.getContext(),
              )}
          </th>
        ))}
      </tr>
    )), [headerGroups],
  );


const useTableBodyRows = (rows: Row<RowData>[]) =>
  useMemo(() =>
    rows.map(row => (
      <tr key={row.id}>
        {row.getVisibleCells().map(cell => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    )), [rows],
  );


export function VacanciesTable({ vacancies = [] }: { vacancies: TVacancyOverview[] }) {
  const columns = useTableColumns();
  // TODO: разрулить типы более красиво
  const table = useReactTable<TVacancyOverview>({
    data: vacancies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  } as TableOptions<TVacancyOverview>);
  const headRows = useTableHeadRows(table.getHeaderGroups());
  const bodyRows = useTableBodyRows(table.getRowModel().rows);

  return (
    <table>
      <thead>
      {headRows}
      </thead>
      <tbody>
      {bodyRows}
      </tbody>
    </table>
  );
}
