import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'next/navigation';
import { VACANCIES_QUERY_COOKIE_NAME } from '@/entities/vacancies';
import { useAppNavigation } from '@/shared/lib';

export const useQueryStateManager = () => {
  const { pushQuery } = useAppNavigation();
  const searchParams = useSearchParams();
  const params = searchParams.toString();
  const [cookies, setCookie] = useCookies([VACANCIES_QUERY_COOKIE_NAME]);
  const queryCookie = cookies[VACANCIES_QUERY_COOKIE_NAME] ?? '';

  // Актуализация куков при каждом изменении параметров УРЛ
  useEffect(() => {
    const isCurrentParams = params.length > 0;

    if (isCurrentParams) {
      setCookie(VACANCIES_QUERY_COOKIE_NAME, params);
      return;
    }
  }, [params, setCookie]);

  // Актуализация УРЛ по кукам при первоначальном рендере
  useEffect(() => {
    const isCookieQuerySynchronized = queryCookie === params;

    if (isCookieQuerySynchronized) {
      return;
    }

    pushQuery(queryCookie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
