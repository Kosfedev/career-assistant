import { useMemo } from 'react';
import { useVacanciesOverviewStored, TVacancyStatus } from '@/entities/vacancies';
import { TVacancyOverviewExtended } from '@/entities/vacancies/model/types';

export const useGetLSVacancies = (status: TVacancyStatus) => {
  const [vacanciesStored] = useVacanciesOverviewStored();

  return useMemo(() => {
    const vacanciesEntries = Object.entries(vacanciesStored);
    const vacanciesEntriesFiltered = vacanciesEntries
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, vacancy]) => (vacancy).status === status)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([_, vacancy]) => vacancy);

    return vacanciesEntriesFiltered as TVacancyOverviewExtended[];
  }, [status, vacanciesStored]);
};
