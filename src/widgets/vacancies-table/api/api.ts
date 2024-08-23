import { useSearchParams } from 'next/navigation';
import { EVacancyStatuses, TVacanciesResponse, useGetHHVacancies } from '@/entities/vacancies';
import { EVacanciesTabs } from '@/features/vacancies/tabs';
import { useGetLSVacanciesByStatus } from '../model/local-storage';

export const useGetVacancies = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const { page, tab, ...relevantParams } = params;
  // HH считает страницы от 0
  const fixedParams = { ...relevantParams, page: params.page ? +params.page - 1 : 0 };
  const status = (EVacanciesTabs[params.tab as keyof typeof EVacanciesTabs] ?? 0) as unknown as EVacancyStatuses;

  // TODO: закинуть в useMemo, чтобы дергало что-то одно
  const { data: HHVacanciesData = {} as Partial<TVacanciesResponse> } = useGetHHVacancies(fixedParams);
  const HHVacancies = {
    ...HHVacanciesData,
    // HH считает страницы от 0
    page: typeof HHVacanciesData.page === 'number' ? +HHVacanciesData.page + 1 : undefined,
  } as TVacanciesResponse;
  const storedVacanciesByStatus = useGetLSVacanciesByStatus(status);

  return status === EVacancyStatuses.Default ? HHVacancies : {
    page: 1,
    pages: 1,
    per_page: 999,
    found: storedVacanciesByStatus.length ?? 0,
    items: storedVacanciesByStatus,
  };
};
