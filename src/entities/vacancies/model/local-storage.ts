import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { TVacanciesStorage, TVacancyOverview, TVacancyOverviewExtended, TVacancyStatus } from './types';

export const useLSVacanciesOverview = () => useLocalStorage<TVacanciesStorage>('vacancies-overview-stored', {});

export const useSaveVacancyOverview = () => {
  const [vacanciesStored, setVacanciesStored] = useLSVacanciesOverview();

  return useCallback((vacancy: TVacancyOverview, status: TVacancyStatus) => {
    const storedVacancy = vacanciesStored[vacancy.id];

    if (!!storedVacancy && storedVacancy.status === status) {
      return;
    }

    const newVacancyStored: TVacancyOverviewExtended = { ...vacancy, status };
    const newVacanciesStored = { ...vacanciesStored, [vacancy.id]: newVacancyStored };

    setVacanciesStored(newVacanciesStored);
  }, [setVacanciesStored, vacanciesStored]);
};
