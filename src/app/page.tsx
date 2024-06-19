'use client';

import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { Table } from '@/features/vacancies-table/ui/VacanciesTable';
import { TVacancyOverview } from '@/shared/api/models';
import { BACKEND_BASE_URL } from '@/shared/config/backend';

import styles from './page.module.css';

export default function Home() {
  // TODO: разрулить типы более красиво
  const { data: vacancies = [], isFetching, refetch: fetchVacancies } = useQuery({
    queryKey: ['vacancies-overview'],
    queryFn: () => fetch(`${BACKEND_BASE_URL}/vacancies?text='frontend удаленная работа'&per_page=50&only_with_salary=true`).then(res => res.json().then(json => json.items)),
    enabled: false,
  } as DefinedInitialDataOptions<TVacancyOverview[]>);

  return (
    <main className={styles.main}>
      <button onClick={fetchVacancies} disabled={isFetching}>
        Сделать выгрузку
      </button>
      <Table vacancies={vacancies} />
    </main>
  );
}
