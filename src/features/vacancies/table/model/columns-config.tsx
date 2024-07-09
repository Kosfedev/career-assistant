import { useMemo } from 'react';
import { createColumnHelper, TableOptions } from '@tanstack/react-table';

import { TVacancyOverview, useSaveVacancyOverview } from '@/entities/vacancies';
import { useLSDictionaries } from '@/entities/dictionaries';
import Link from 'next/link';

const columnHelper = createColumnHelper<TVacancyOverview>();

export const useTableColumns = (): TableOptions<TVacancyOverview>['columns'] => {
  const [dictionaries] = useLSDictionaries();
  const saveVacancyOverview = useSaveVacancyOverview();

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
        }, {
          accessorKey: 'salary.to',
          header: 'До',
        }, {
          accessorKey: 'salary.currency',
          header: 'Валюта',
          cell: (props) => {
            // TODO: вынести в lib
            const currencyCode = props.getValue();
            const currencyItem = dictionaries?.currency.find(({ code }) => code === currencyCode);

            return currencyItem ? currencyItem.abbr : currencyCode;
          },
        }, {
          accessorKey: 'salary.gross',
          header: 'Налоги',
          cell: (props) => {
            const isGross = props.getValue();

            return isGross ? 'До вычета' : 'После вычета';
          },
        },
      ],
    }),
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => (
        <>
          <button onClick={() => {
            {/* TODO: add enum or const */
            }
            saveVacancyOverview(row.original, 1);
          }}>Добавить
          </button>
          <Link href={`/vacancies/${row.original.id}`}>{'->'}</Link>
        </>
      ),
    }),
  ], [dictionaries?.currency, saveVacancyOverview]);
};
