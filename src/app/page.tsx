'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import queryString from 'query-string';

import { VacanciesTable } from '@/features/vacancies-table';
import { TVacancyOverview } from '@/shared/api/models';
import { BACKEND_BASE_URL } from '@/shared/config/backend';

import styles from './page.module.css';

// TODO: починить подсказки
const VacanciesFilters = dynamic(() => import('@/features/vacancies-filters/').then(mod => mod.VacanciesFilters), { ssr: false });

export default function Home() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });
  // TODO: разрулить типы более красиво
  const { data: vacancies = [] } = useQuery({
    queryKey: ['vacancies-overview', paramsString],
    queryFn: () => fetch(`${BACKEND_BASE_URL}/vacancies?${paramsString}`).then(res => res.json().then(json => json.items)),
  } as DefinedInitialDataOptions<TVacancyOverview[]>);

  return (
    <main className={styles.main}>
      <VacanciesFilters />
      <VacanciesTable vacancies={vacancies} />
    </main>
  );
}
