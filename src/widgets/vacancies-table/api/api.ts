import { useSearchParams } from 'next/navigation';
import { TVacancyResponse, TVacancyStatus, useGetHHVacancies } from '@/entities/vacancies';
import { EVacanciesTabs } from '@/features/vacancies/tabs';
import { useGetLSVacanciesByStatus } from '../model/local-storage';

export const useGetVacancies = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  // HH считает страницы от 0
  const fixedParams = { ...params, page: params.page ? params.page - 1 : 0, tab: undefined };
  const status = (EVacanciesTabs[params.tab] ?? 0) as TVacancyStatus;

  // TODO: закинуть в useMemo, чтобы дергало что-то одно
  const { data: HHVacanciesData = {} as TVacancyResponse } = useGetHHVacancies(fixedParams);
  const HHVacancies = {
    ...HHVacanciesData,
    // HH считает страницы от 0
    page: HHVacanciesData?.page ? +HHVacanciesData.page + 1 : undefined,
  } as TVacancyResponse;
  const storedVacanciesByStatus = useGetLSVacanciesByStatus(status);

  return status === 0 ? HHVacancies : {
    page: 1,
    pages: 1,
    per_page: 999,
    found: storedVacanciesByStatus.length ?? 0,
    items: storedVacanciesByStatus,
  };
};
