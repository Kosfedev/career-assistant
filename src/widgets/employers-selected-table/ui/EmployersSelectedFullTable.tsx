'use client';

import { useEmployersSelected } from '@/entities/employers-selected';
import { EmployersSelectedTable } from '@/features/employers-selected/table';

export function EmployersSelectedFullTable() {
  const [employersSelected] = useEmployersSelected();

  return (
    <section>
      <div className="mt-6 p-4 bg-dark-200 rounded-lg">
        {/* TODO: type error during deploy */}
        {/* @ts-ignore */}
        <EmployersSelectedTable employers={Array.from(employersSelected).map(([,employer])=>employer).sort(({ count: countA }, { count: countB })=> countB - countA)} />
      </div>
    </section>
  );
}
