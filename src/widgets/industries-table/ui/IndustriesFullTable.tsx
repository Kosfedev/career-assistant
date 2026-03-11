'use client';

import { useUpdateIndustries } from '../model/updateIndustries';
import { useLSIndustries, useLSIndustriesMain } from '@/entities/industries/model/local-storage';
import { IndustriesTable } from '@/features/industries/table';

export function IndustriesFullTable() {
  const [industries] = useLSIndustries();
  const [industriesMain] = useLSIndustriesMain();
  const updateIndustries = useUpdateIndustries();

  return (
    <section>
      <div className="mt-6 p-4 bg-dark-200 rounded-lg">
        <div className={'flex'}>
          <div>
            <button onClick={updateIndustries}>Подсчитать сферы</button>
          </div>
        </div>
        {/* TODO: type error during deploy */}
        {/* @ts-ignore */}
        <IndustriesTable industries={industries} />
      </div>
    </section>
  );
}
