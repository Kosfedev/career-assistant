import { useMemo } from 'react';
import { TableOptions } from '@tanstack/react-table';

import { TVacancyOverview, TVacancyStored } from '@/entities/vacancies';

export const useTableColumns = (): TableOptions<TVacancyOverview | TVacancyStored>['columns'] => {
  return useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
    }, {
      accessorKey: 'name',
      header: 'Название',
    }, {
      accessorKey: 'count',
      header: 'Количество вакансий',
    },
  ], []);
};
