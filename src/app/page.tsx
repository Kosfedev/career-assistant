'use client';

import dynamic from 'next/dynamic';

import { VacanciesTable } from '@/features/vacancies-table';
import { useGetVacancies } from './api/api';

import styles from './page.module.css';

// TODO: починить подсказки
const VacanciesFilters = dynamic(() => import('@/features/vacancies-filters/').then(mod => mod.VacanciesFilters), { ssr: false });

export default function Home() {
  const { data: vacancies = [] } = useGetVacancies();

  return (
    <main className={styles.main}>
      <VacanciesFilters />
      <VacanciesTable vacancies={vacancies} />
    </main>
  );
}
