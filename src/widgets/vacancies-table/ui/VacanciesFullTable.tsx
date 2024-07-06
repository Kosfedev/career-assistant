'use client';

import dynamic from 'next/dynamic';
import { VacanciesTable } from '@/features/vacancies/table';
import { VacanciesPagination } from '@/features/vacancies/pagination';
import { VacanciesTabs } from '@/features/vacancies/tabs';
import { useGetVacancies } from '../api/api';

// TODO: починить подсказки
const VacanciesFilters = dynamic(() => import('@/features/vacancies/filters/').then(mod => mod.VacanciesFilters), { ssr: false });

export function VacanciesFullTable() {
  const { items: vacancies, page, pages, per_page, found } = useGetVacancies();

  return (
    <section>
      <VacanciesTabs />
      <VacanciesFilters />
      <VacanciesTable vacancies={vacancies} />
      <VacanciesPagination pagination={{ page, pages, per_page, found }} />
    </section>
  );
}
