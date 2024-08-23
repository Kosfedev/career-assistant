import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { TVacancyStored, TVacanciesStorage, TVacancyOverview } from './types';
import { EVacancyStatuses } from './constants';
// TODO: FSD breach - same layer slices cross import
import { TVacancyDetails } from '@/entities/vacancy';

const useVacanciesOverviewLSBase = () => useLocalStorage<TVacanciesStorage>('vacancies-overview-stored', {});

const useSaveVacancyOverview = () => {
  const [vacanciesStored, setVacanciesStored] = useVacanciesOverviewLSBase();

  return useCallback((vacancy: TVacancyOverview | TVacancyDetails, status: EVacancyStatuses) => {
    const storedVacancy = vacanciesStored[vacancy.id];

    if (!!storedVacancy && storedVacancy.status === status) {
      return;
    }

    const newVacancyStored = { ...vacancy, status } as TVacancyStored;
    const newVacanciesStored = { ...vacanciesStored, [vacancy.id]: newVacancyStored };

    setVacanciesStored(newVacanciesStored);
  }, [setVacanciesStored, vacanciesStored]);
};

export const useVacanciesOverviewLS = () => {
  const [vacanciesLS] = useVacanciesOverviewLSBase();
  const saveVacancyLS = useSaveVacancyOverview();

  return { vacanciesLS, saveVacancyLS };
};
