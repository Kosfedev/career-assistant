import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSearchParams } from 'next/navigation';
import { useAppNavigation } from '@/shared/lib';
import { INDUSTRIES_QUERY_COOKIE_NAME } from '@/entities/industries';

// TODO: перенести в shared? почти дублирует такой же из vacancies full table
export const useQueryStateManager = () => {
  const { pushQuery } = useAppNavigation();
  const searchParams = useSearchParams();
  const params = searchParams.toString();
  const [cookies, setCookie] = useCookies([INDUSTRIES_QUERY_COOKIE_NAME]);
  const queryCookie = cookies[INDUSTRIES_QUERY_COOKIE_NAME] ?? '';

  // Актуализация куков при каждом изменении параметров УРЛ
  useEffect(() => {
    const isCurrentParams = params.length > 0;

    if (isCurrentParams) {
      setCookie(INDUSTRIES_QUERY_COOKIE_NAME, params);
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
