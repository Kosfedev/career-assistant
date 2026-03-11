'use client';

import { useCookies } from 'react-cookie';
import { useUpdateIndustries } from '../model/updateIndustries';
import { useLSIndustries, useLSIndustriesMain } from '@/entities/industries/model/local-storage';
import { IndustriesTable } from '@/features/industries/table';
import { IndustriesTabs, DEFAULT_TAB_NAME } from '@/features/industries/tabs';
import { INDUSTRIES_QUERY_COOKIE_NAME } from '@/entities/industries';
import { useQueryStateManager } from '@/widgets/industries-table/model/query-state-manager';
import * as querystring from 'querystring';

export function IndustriesFullTable() {
  useQueryStateManager();
  const [industries] = useLSIndustries();
  const [industriesMain] = useLSIndustriesMain();
  const [cookies] = useCookies([INDUSTRIES_QUERY_COOKIE_NAME]);
  const { tab = DEFAULT_TAB_NAME } = querystring.parse(cookies[INDUSTRIES_QUERY_COOKIE_NAME] ?? '') ?? {};
  const updateIndustries = useUpdateIndustries();

  return (
    <section>
      <div className="mt-6 p-4 bg-dark-200 rounded-lg">
        <div className={'flex'}>
          <div>
            <button onClick={updateIndustries}>Подсчитать сферы</button>
          </div>
        </div>
        <IndustriesTabs/>
        {/* TODO: type error during deploy */}
        {/* @ts-ignore */}
        <IndustriesTable industries={(tab === DEFAULT_TAB_NAME ? industriesMain : industries) ?? []} />
      </div>
    </section>
  );
}
