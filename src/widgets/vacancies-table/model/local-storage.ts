import { useMemo } from 'react';
import { EVacancyStatuses, TVacancyOverviewExtended, useVacanciesOverviewLS } from '@/entities/vacancies';

export const useGetLSVacanciesByStatus = (status: EVacancyStatuses) => {
  const { vacanciesLS } = useVacanciesOverviewLS();

  return useMemo(() => {
    const vacanciesEntries = Object.entries(vacanciesLS);
    const vacanciesEntriesFiltered = vacanciesEntries
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, vacancy]) => (vacancy).status === status)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, vacancy]) => vacancy);

    return vacanciesEntriesFiltered as TVacancyOverviewExtended[];
  }, [status, vacanciesLS]);
};
