import * as React from 'react';

import {
  createColumnHelper,
  flexRender, getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { VacancyCommonFields } from '../../../shared/api/models';

const columnHelper = createColumnHelper<VacancyCommonFields>();

const columns = [
  columnHelper.accessor('id', {}),
  columnHelper.accessor('name', { header: 'Название' }),
  columnHelper.accessor('description', { header: 'Описание' }),
  columnHelper.group({
    header: 'Зарплата',
    columns: [
      columnHelper.accessor('salary.from', { header: 'От' }),
      columnHelper.accessor('salary.to', { header: 'До' }),
      columnHelper.accessor('salary.currency', {
        header: 'Валюта', cell: (props) => {
          const currency = props.getValue();

          return currency === 'RUR' ? 'Руб. РФ' : currency;
        },
      }),
      columnHelper.accessor('salary.gross', {
        header: 'Налоги', cell: (props) => {
          const isGross = props.getValue();

          return isGross ? 'До вычета' : 'После вычета';
        },
      }),
    ],
  }),
];

export function Table({ vacancies }: { vacancies: VacancyCommonFields[] }) {
  const table = useReactTable({
    data: vacancies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
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
