import { useCallback, useEffect, useMemo, useState } from 'react';
import { createColumnHelper, TableOptions } from '@tanstack/react-table';

import { TEmployerSelected, TIndustry, useLSEmployersSelected } from '@/entities/employers-selected';
import { useGetEmployerById } from '@/entities/employers/api/api';
import { useLSIndustriesDict } from '@/entities/industries';

const columnHelper = createColumnHelper<TEmployerSelected>();

export const useTableColumns = (): TableOptions<TEmployerSelected>['columns'] => {
  const [employersSelected, setEmployersSelected] = useLSEmployersSelected();
  const [savedIndustries] = useLSIndustriesDict();
  const [employerId, setEmployerId] = useState<number>(-1);
  const { data, refetch } = useGetEmployerById(employerId, false);

  useEffect(() => {
    if (!data) {
      return;
    }

    const industriesMainIds = data.industries.map(({ id })=>id.replaceAll(/(\d+)\..+/gm, '$1'));
    const industriesMain = savedIndustries ? savedIndustries.filter(({ id })=>industriesMainIds.includes(id)).map(({ id, name })=>({ id, name }))   : [];

    const employer = { ...employersSelected.get(data.id), industries: data.industries, industriesMain: industriesMain };
    employersSelected.set(data.id, employer as  TEmployerSelected  );
    setEmployersSelected(employersSelected);
  }, [data]);

  useEffect(() => {
    if (employerId == -1) {
      return;
    }

    refetch();
  }, [employerId]);
  
  const getEmployerIndustries = useCallback((id: number)=>{
    setEmployerId(id);
  }, [refetch]);

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
      accessorKey: 'count',
      header: 'Количество вакансий',
    },
    {
      accessorKey: 'industries',
      accessorFn: (originalRow) => originalRow.industries ?? [],
      cell: (props) => {
        const industries = props.getValue();

        return industries.map(({ id, name }: TIndustry)=><div key={id}>{name}</div>);
      },
      header: 'Сферы',
    },
    {
      accessorKey: 'industriesMain',
      accessorFn: (originalRow) => originalRow.industriesMain ?? [],
      cell: (props) => {
        const industries = props.getValue();

        return industries.map(({ id, name }: TIndustry)=><div key={id}>{name}</div>);
      },
      header: 'Сферы (общие)',
    },
    columnHelper.display({
      id: 'actions',
      cell: ({ row }) => {
        const { id } = row.original;

        return (
          <div className={'flex justify-end'}>
            {/* TODO: переделать на компонент */}
            <button className={'text-primary-500 hover:text-primary-400 active:text-primary-400'} onClick={() => {
              getEmployerIndustries(id);
            }}>
              Подтянуть сферы
            </button>
          </div>
        );
      },
    }),
  ], [getEmployerIndustries]);
};
