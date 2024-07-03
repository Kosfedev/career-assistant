import { useMemo } from 'react';
import { createColumnHelper, TableOptions } from '@tanstack/react-table';

import { TVacancyOverview } from '@/entities/vacancies';
import { useLSDictionaries } from '@/entities/dictionaries';

const columnHelper = createColumnHelper<TVacancyOverview>();

export const useTableColumns = (): TableOptions<TVacancyOverview>['columns'] => {
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
