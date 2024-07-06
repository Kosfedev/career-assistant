import { useSearchParams } from 'next/navigation';
import { TVacancyResponse, TVacancyStatus, useGetHHVacancies } from '@/entities/vacancies';
import { EVacanciesTabs } from '@/features/vacancies/tabs';
import { useGetLSVacancies } from '../model/local-storage';

export const useGetVacancies = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const fixedParams = { ...params, page: params.page ? params.page - 1 : 0, tab: undefined };
  const status = (EVacanciesTabs[params.tab] ?? 0) as TVacancyStatus;

  // TODO: закинуть в useMemo, чтобы дергало что-то одно
  const { data: HHVacancies = {} as TVacancyResponse } = useGetHHVacancies(fixedParams);
  const storedVacanciesByStatus = useGetLSVacancies(status);

  return status === 0 ? HHVacancies : {
    page: 1,
    pages: 1,
    per_page: 999,
    found: storedVacanciesByStatus.length ?? 0,
    items: storedVacanciesByStatus,
  };
};
