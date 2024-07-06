import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  HeaderGroup, Row, RowData,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';

import { TVacancyOverview } from '@/entities/vacancies';
import { useTableColumns } from '../model/columns-config';

const getTableHeadRows = (headerGroups: HeaderGroup<RowData>[]) =>
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
  ));


const getTableBodyRows = (rows: Row<RowData>[]) =>
  rows.map((row) =>
    <tr key={row.id}>
      {row.getVisibleCells().map(cell => {
        return (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>,
  );

export function VacanciesTable({ vacancies = [] }: { vacancies: TVacancyOverview[] }) {
  const columns = useTableColumns();
  // TODO: разрулить типы более красиво
  const table = useReactTable<TVacancyOverview>({
    data: vacancies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  } as TableOptions<TVacancyOverview>);
  const headRows = getTableHeadRows(table.getHeaderGroups());
  const bodyRows = getTableBodyRows(table.getRowModel().rows);

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
