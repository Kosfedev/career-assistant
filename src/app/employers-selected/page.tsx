'use client';

import { Suspense } from 'react';
import { EmployersSelectedFullTable } from '@/widgets/employers-selected-table';

export default function Home() {
  return (
    <Suspense>
      <EmployersSelectedFullTable />
    </Suspense>
  );
}
