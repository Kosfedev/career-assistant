'use client';

import dynamic from 'next/dynamic';
import { useCookies } from 'react-cookie';
import { VacanciesTable } from '@/features/vacancies/table';
import { VacanciesPagination } from '@/features/vacancies/pagination';
import { DEFAULT_TAB_NAME, VacanciesTabs } from '@/features/vacancies/tabs';
import { VACANCIES_QUERY_COOKIE_NAME } from '@/entities/vacancies';
import { useGetVacancies } from '../api/api';

// TODO: починить подсказки
const VacanciesFilters = dynamic(() => import('@/features/vacancies/filters/').then(mod => mod.VacanciesFilters), { ssr: false });

export function VacanciesFullTable() {
  const { items: vacancies, page, pages, per_page, found } = useGetVacancies();
  const [cookies] = useCookies([VACANCIES_QUERY_COOKIE_NAME]);
  const { tab = DEFAULT_TAB_NAME } = cookies[VACANCIES_QUERY_COOKIE_NAME] ?? {};

  return (
    <section>
      <VacanciesTabs />
      <div className={'mt-6 p-4 bg-dark-200 rounded-lg'}>
        {tab === DEFAULT_TAB_NAME && <VacanciesFilters />}
        <VacanciesTable vacancies={vacancies} />
        {tab === DEFAULT_TAB_NAME && <VacanciesPagination pagination={{ page, pages, per_page, found }} />}
      </div>
    </section>
  );
}
