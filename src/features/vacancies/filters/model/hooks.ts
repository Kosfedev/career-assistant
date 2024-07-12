import { useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import queryString from 'query-string';

import { VACANCIES_QUERY_COOKIE_NAME } from '@/entities/vacancies';

export const useFiltersInitialValues = () => {
  const [cookies] = useCookies([VACANCIES_QUERY_COOKIE_NAME]);
  const {
    currency,
    employment,
    experience,
    only_with_salary,
    salary,
    schedule,
    search_field,
    text,
  } = cookies[VACANCIES_QUERY_COOKIE_NAME] ?? {};

  return useMemo(() => ({
    text: text ?? '',
    search_field: search_field ?? '',
    employment: employment ?? '',
    experience: experience ?? '',
    schedule: schedule ?? '',
    currency: currency ?? '',
    salary: salary ?? '',
    only_with_salary: only_with_salary === 'true',
  }), [
    currency,
    employment,
    experience,
    only_with_salary,
    salary,
    schedule,
    search_field,
    text,
  ]);
};

export const useFiltersStateManager = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const paramsString = queryString.stringify(params);
  const [cookies, setCookie] = useCookies([VACANCIES_QUERY_COOKIE_NAME]);
  const filtersCookie = cookies[VACANCIES_QUERY_COOKIE_NAME];

  useEffect(() => {
    const isCurrentParams = paramsString.length > 0;

    if (isCurrentParams) {
      setCookie(VACANCIES_QUERY_COOKIE_NAME, params);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cookieFilters = queryString.stringify(filtersCookie);
    const correctPathName = pathname.replace(/^\//, '');
    const isCookieQuerySynchronized = cookieFilters === paramsString;

    if (isCookieQuerySynchronized) {
      return;
    }

    router.push(`${correctPathName}/?${cookieFilters}`);
  }, [filtersCookie, paramsString, pathname, router]);
};
