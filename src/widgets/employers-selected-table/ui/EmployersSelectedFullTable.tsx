'use client';

import { EmployersSelectedTable } from '@/features/employers-selected/table';
import { useSortedData } from '../model/sorted-data';

export function EmployersSelectedFullTable() {
  const { employersSelectedSorted, industriesSorted, industriesMainSorted, getEmployersIndustries, isFetching } = useSortedData();

  return (
    <section>
      <div className="mt-6 p-4 bg-dark-200 rounded-lg">
        <div className={'flex'}>
          <div>
            <p>
              Итого компаний: {employersSelectedSorted.length}
            </p>
            <button onClick={getEmployersIndustries || employersSelectedSorted.length === 0} disabled={isFetching}>Подтянуть сферы</button>
          </div>
          <ul>{industriesSorted.map(({ id, name, count }) => (<li key={id}>{name}: {count}</li>))}</ul>
          <ul>{industriesMainSorted.map(({ id, name, count }) => (<li key={id}>{name}: {count}</li>))}</ul>
        </div>
        {/* TODO: type error during deploy */}
        {/* @ts-ignore */}
        <EmployersSelectedTable employers={employersSelectedSorted} />
      </div>
    </section>
  );
}
