'use client';

import { EmployersSelectedTable } from '@/features/employers-selected/table';
import { EmployersFilters } from '@/features/employers-selected/filters';
import { useSortedData } from '../model/sorted-data';

export function EmployersSelectedFullTable() {
  const { employersSelectedSorted, getEmployersIndustries, isFetching } = useSortedData();

  return (
    <section>
      <div className="mt-6 p-4 bg-dark-200 rounded-lg">
        <EmployersFilters/>
        <div className={'flex'}>
          <div>
            <p>
              Итого компаний: {employersSelectedSorted.length}
            </p>
            <button onClick={getEmployersIndustries || employersSelectedSorted.length === 0} disabled={isFetching}>Подтянуть сферы</button>
          </div>
        </div>
        {/* TODO: type error during deploy */}
        {/* @ts-ignore */}
        <EmployersSelectedTable employers={employersSelectedSorted} />
      </div>
    </section>
  );
}
