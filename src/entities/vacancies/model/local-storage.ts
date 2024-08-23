import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { TVacanciesStorage, TVacancyOverview, TVacancyOverviewExtended } from './types';
import { EVacancyStatuses } from './constants';

const useVacanciesOverviewLSBase = () => useLocalStorage<TVacanciesStorage>('vacancies-overview-stored', {});

const useSaveVacancyOverview = () => {
  const [vacanciesStored, setVacanciesStored] = useVacanciesOverviewLSBase();

  return useCallback((vacancy: TVacancyOverview, status: EVacancyStatuses) => {
    const storedVacancy = vacanciesStored[vacancy.id];

    if (!!storedVacancy && storedVacancy.status === status) {
      return;
    }

    const newVacancyStored: TVacancyOverviewExtended = { ...vacancy, status };
    const newVacanciesStored = { ...vacanciesStored, [vacancy.id]: newVacancyStored };

    setVacanciesStored(newVacanciesStored);
  }, [setVacanciesStored, vacanciesStored]);
};

export const useVacanciesOverviewLS = () => {
  const [vacanciesLS] = useVacanciesOverviewLSBase();
  const saveVacancyLS = useSaveVacancyOverview();

  return { vacanciesLS, saveVacancyLS };
};
