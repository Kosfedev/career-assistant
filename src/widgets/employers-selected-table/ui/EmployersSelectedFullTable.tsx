'use client';

import { useMemo } from 'react';
import { useLSEmployersSelected } from '@/entities/employers-selected';
import { EmployersSelectedTable } from '@/features/employers-selected/table';

export function EmployersSelectedFullTable() {
  const [employersSelected] = useLSEmployersSelected();
  const employersSelectedSorted = useMemo(
    ()=> Array.from(employersSelected).map(([,employer])=>employer).sort(({ count: countA }, { count: countB })=> countB - countA),
    [],
  );

  return (
    <section>
      <div className="mt-6 p-4 bg-dark-200 rounded-lg">
        <div>
          <p>
            Итого компаний: {employersSelectedSorted.length}
          </p>
        </div>
        {/* TODO: type error during deploy */}
        {/* @ts-ignore */}
        <EmployersSelectedTable employers={employersSelectedSorted} />
      </div>
    </section>
  );
}
