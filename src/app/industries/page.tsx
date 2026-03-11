'use client';

import { Suspense } from 'react';
import { IndustriesFullTable } from '@/widgets/industries-table';

export default function Home() {
  return (
    <Suspense>
      <IndustriesFullTable />
    </Suspense>
  );
}
