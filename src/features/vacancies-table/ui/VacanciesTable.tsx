import React, { useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';

import { TVacancyOverview } from '@/shared/api/models';
import { useLSDictionaries } from '@/entities/dictionaries';

const columnHelper = createColumnHelper<TVacancyOverview>();

const useColumns = (): TableOptions<TVacancyOverview>['columns'] => {
  const [dictionaries] = useLSDictionaries();

  return useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Название',
    },
    {
      accessorKey: 'experience.name',
      header: 'Опыт работы',
    },
    {
      accessorKey: 'schedule.name',
      header: 'Режим работы',
    },
    columnHelper.group({
      header: 'Зарплата',
      columns: [
        {
          accessorKey: 'salary.from',
          header: 'От',
        },
        {
          accessorKey: 'salary.to',
          header: 'До',
        },
        {
          accessorKey: 'salary.currency',
          header: 'Валюта',
          cell: (props) => {
            const currencyCode = props.getValue();
            const currencyItem = dictionaries?.currency.find(({ code }) => code === currencyCode);

            return currencyItem ? currencyItem.abbr : currencyCode;
          },
        },
        {
          accessorKey: 'salary.gross',
          header: 'Налоги',
          cell: (props) => {
            const isGross = props.getValue();

            return isGross ? 'До вычета' : 'После вычета';
          },
        },
      ],
    }),
  ], [dictionaries]);
};

export function VacanciesTable({ vacancies }: { vacancies: TVacancyOverview[] }) {
  const columns = useColumns();
  // TODO: разрулить типы более красиво
  const table = useReactTable<TVacancyOverview>({
    data: vacancies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  } as TableOptions<TVacancyOverview>);

  return (
    <div>
      <table>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
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
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
        <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.footer,
                    header.getContext(),
                  )}
              </th>
            ))}
          </tr>
        ))}
        </tfoot>
      </table>
    </div>
  );
}
