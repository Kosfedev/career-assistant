import { useMemo } from 'react';
import { createColumnHelper, TableOptions } from '@tanstack/react-table';

import { EVacancyStatuses, TVacancyOverview, TVacancyStored } from '@/entities/vacancies';
import { useLSDictionaries } from '@/entities/dictionaries';
import Link from 'next/link';
import { useMutateVacancy } from '@/entities/vacancy';

const columnHelper = createColumnHelper<TVacancyOverview | TVacancyStored>();

export const useTableColumns = (): TableOptions<TVacancyOverview | TVacancyStored>['columns'] => {
  const [dictionaries] = useLSDictionaries();
  const { useSaveVacancy } = useMutateVacancy();
  const { mutateAsync: saveVacancy } = useSaveVacancy();

  return useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'published_at',
      header: 'Дата публикации',
      cell: (props) => {
        const publishDate = new Date(props.getValue());

        return publishDate.toLocaleDateString();
      },
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
        // TODO: вынести в lib
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
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => {
        const vacancy = row.original;

        return (
          <div className={'flex justify-end'}>
            {/* TODO: переделать на компонент */}
            <button className={'text-primary-500 hover:text-primary-400 active:text-primary-400'} onClick={() => {
              // @ts-ignore
              saveVacancy({ ...vacancy, status: EVacancyStatuses.Selection });
            }}>
              Сохранить
            </button>
            <Link
              className={'[&:not(:first-child)]:ml-2 inline-flex justify-center items-center w-6 h-6 border-2 border-primary-500 hover:border-primary-400 active:border-primary-400 rounded-full text-primary-500 hover:text-primary-400 active:text-primary-400'}
              href={`/vacancies/${row.original.id}`}
              title={'Перейти к вакансии'}
            >
              {'->'}
            </Link>
          </div>
        );
      },
    }),
  ], [dictionaries?.currency, saveVacancy]);
};
