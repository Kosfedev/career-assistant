'use client';

import dynamic from 'next/dynamic';

import { VacanciesTable } from '@/features/vacancies/table';
import { TVacancyResponse, useGetVacancies } from '@/entities/vacancies';

import styles from './page.module.css';
import { VacanciesPagination } from '@/features/vacancies/pagination';

// TODO: починить подсказки
const VacanciesFilters = dynamic(() => import('@/features/vacancies/filters/').then(mod => mod.VacanciesFilters), { ssr: false });

export default function Home() {
  const { data: vacancies = {} as TVacancyResponse } = useGetVacancies();
  // TODO: переименовать?
  const { page, pages, per_page, found } = vacancies;

  return (
    <main className={styles.main}>
      <VacanciesFilters />
      <VacanciesTable vacancies={vacancies.items} />
      <VacanciesPagination pagination={{ page, pages, per_page, found }} />
    </main>
  );
}
