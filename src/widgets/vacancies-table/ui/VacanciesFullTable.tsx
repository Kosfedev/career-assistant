'use client';

import dynamic from 'next/dynamic';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { VacanciesTable } from '@/features/vacancies/table';
import { VacanciesPagination } from '@/features/vacancies/pagination';
import { DEFAULT_TAB_NAME, VacanciesTabs } from '@/features/vacancies/tabs';
import { VACANCIES_QUERY_COOKIE_NAME } from '@/entities/vacancies';
import { useLSEmployersSelected } from '@/entities/employers-selected';
import { useGetVacancies } from '../api/api';
import { useQueryStateManager } from '../model/query-state-manager';

const VacanciesFilters = dynamic(() => import('@/features/vacancies/filters/').then(mod => mod.VacanciesFilters), { ssr: false });

const VACANCIES_PROCESSED_LS_NAME = 'vacancies_processed';

export function VacanciesFullTable() {
  useQueryStateManager();
  const { items: vacancies, page, pages, per_page, found } = useGetVacancies();
  const [cookies] = useCookies([VACANCIES_QUERY_COOKIE_NAME]);
  const { tab = DEFAULT_TAB_NAME } = cookies[VACANCIES_QUERY_COOKIE_NAME] ?? {};
  const [savedEmployers, setSavedEmployersLS] = useLSEmployersSelected();
  // TODO: вынести в employers selected?
  const [vacanciesProcessed, setVacanciesProcessedLS] = useLocalStorage(VACANCIES_PROCESSED_LS_NAME, new Set<string>, {
    deserializer:(value)=>new Set<string>(JSON.parse(value)),
    serializer:(value)=>JSON.stringify(Array.from(value)),
  });

  // TODO: перенести грязь
  useEffect(() => {
    if (!vacancies) {
      return;
    }

    vacancies.forEach(({ id, employer })=> {
      if (vacanciesProcessed.has(id)) {
        return;
      }
      vacanciesProcessed.add(id);

      if (!employer) {
        return;
      }
      
      const savedEmployer = savedEmployers.get(employer.id as string) ?? { id: Number(employer.id), name: employer.name, count: 0 };
      savedEmployers.set(employer.id as string, { ...savedEmployer, count: savedEmployer.count + 1 });
    });

    setSavedEmployersLS(savedEmployers);
    setVacanciesProcessedLS(vacanciesProcessed);
  }, [JSON.stringify(vacancies)]);

  return (
    <section>
      <VacanciesTabs />
      <div className="mt-6 p-4 bg-dark-200 rounded-lg">
        {tab === DEFAULT_TAB_NAME && <VacanciesFilters />}
        {tab === DEFAULT_TAB_NAME && <VacanciesPagination pagination={{ page, pages, per_page, found }} />}
        {/* TODO: type error during deploy */}
        {/* @ts-ignore */}
        <VacanciesTable vacancies={vacancies} />
        {tab === DEFAULT_TAB_NAME && <VacanciesPagination pagination={{ page, pages, per_page, found }} />}
      </div>
    </section>
  );
}
