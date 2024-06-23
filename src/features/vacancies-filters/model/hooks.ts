import { useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCookies } from 'react-cookie';
import queryString from 'query-string';

import { FILTERS_COOKIE_NAME } from './constants';

export const useFiltersInitialValues = () => {
  const [cookies] = useCookies([FILTERS_COOKIE_NAME]);
  const { employment, experience, schedule, currency } = cookies['vacancies-filters'] ?? {};

  return useMemo(() => ({
    text: '',
    search_field: '',
    employment: employment ?? '',
    experience: experience ?? '',
    schedule: schedule ?? '',
    currency: currency ?? '',
    salary: '',
    only_with_salary: false,
  }), [currency, employment, experience, schedule]);
};

export const useFiltersStateManager = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const paramsString = queryString.stringify(params);
  const [cookies, setCookie] = useCookies([FILTERS_COOKIE_NAME]);
  const filtersCookie = cookies[FILTERS_COOKIE_NAME];

  useEffect(() => {
    const isCurrentParams = paramsString.length > 0;

    if (isCurrentParams) {
      setCookie(FILTERS_COOKIE_NAME, params);
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
