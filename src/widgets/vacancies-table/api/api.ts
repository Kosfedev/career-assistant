import { EVacancyStatuses, TVacanciesResponse, useGetHHVacancies, useGetSavedVacancies } from '@/entities/vacancies';
import { EVacanciesTabs } from '@/features/vacancies/tabs';
import { useEffect } from 'react';
import { useAppNavigation } from '@/shared/lib';

export const useGetVacancies = () => {
  const { searchParams, searchParamsObj } = useAppNavigation();
  const { page, tab, ...relevantParams } = searchParamsObj;
  // HH считает страницы от 0
  const fixedParams = { ...relevantParams, page: page ? +page - 1 : 0 };
  const status = (EVacanciesTabs[tab as keyof typeof EVacanciesTabs] ?? EVacancyStatuses.Default) as unknown as EVacancyStatuses;

  const { data: savedVacanciesData = [], refetch: getSavedVacancies } = useGetSavedVacancies({ status }, false);
  const {
    data: HHVacanciesData = {} as Partial<TVacanciesResponse>,
    refetch: getHHVacancies,
  } = useGetHHVacancies(fixedParams, false);

  useEffect(() => {
    if (status !== EVacancyStatuses.Default) {
      getSavedVacancies();
      return;
    }

    getHHVacancies();
  }, [getHHVacancies, getSavedVacancies, status, searchParams]);

  const HHVacancies = {
    ...HHVacanciesData,
    // HH считает страницы от 0
    page: typeof HHVacanciesData.page === 'number' ? +HHVacanciesData.page + 1 : undefined,
  } as TVacanciesResponse;

  return status === EVacancyStatuses.Default ? HHVacancies : {
    page: 1,
    pages: 1,
    per_page: 999,
    found: savedVacanciesData.length ?? 0,
    items: savedVacanciesData,
  };
};
