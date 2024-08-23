import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { TVacancyStored, TVacanciesStorage, TVacancyOverview } from './types';
import { EVacancyStatuses } from './constants';
// TODO: FSD breach - same layer slices cross import
import { TVacancyDetails } from '@/entities/vacancy';

const useVacanciesLSBase = () => useLocalStorage<TVacanciesStorage>('vacancies-overview-stored', {});

const useVacancyLSSave = () => {
  const [vacanciesStored, setVacanciesStored] = useVacanciesLSBase();

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

const useVacancyLSDelete = () => {
  const [vacanciesStored, setVacanciesStored] = useVacanciesLSBase();

  return useCallback((vacancyId: number) => {
    const newVacanciesStored = structuredClone(vacanciesStored);

    delete newVacanciesStored[vacancyId];

    setVacanciesStored(newVacanciesStored);
  }, [setVacanciesStored, vacanciesStored]);
};

export const useVacanciesLS = () => {
  const [vacanciesLS] = useVacanciesLSBase();
  const saveVacancyLS = useVacancyLSSave();
  const deleteVacancyLS = useVacancyLSDelete();

  return { vacanciesLS, saveVacancyLS, deleteVacancyLS };
};
