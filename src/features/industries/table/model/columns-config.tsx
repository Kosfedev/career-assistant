import {  useMemo } from 'react';
import { TableOptions } from '@tanstack/react-table';
import { TIndustryStat } from '@/entities/industries';

export const useTableColumns = (): TableOptions<TIndustryStat>['columns'] => {
  return useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
    }, {
      accessorKey: 'name',
      header: 'Название',
    }, {
      accessorKey: 'countEmployers',
      header: 'Количество компаний',
    }, {
      accessorKey: 'countVacancies',
      header: 'Количество вакансий',
    },
  ], []);
};
