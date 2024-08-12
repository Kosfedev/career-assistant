'use client';

import { Suspense } from 'react';
import { VacanciesFullTable } from '@/widgets/vacancies-table';

export default function Home() {
  return (
    <Suspense>
      <VacanciesFullTable />
    </Suspense>
  );
}
