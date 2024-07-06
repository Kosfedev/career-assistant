import React, { useCallback } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useCookies } from 'react-cookie';
import { VACANCIES_QUERY_COOKIE_NAME } from '@/entities/vacancies';

import { tabsConfig, DEFAULT_TAB_NAME } from '../model/config';
import { TTabName } from '../model/types';

export function VacanciesTabs(): React.ReactNode {
  const [cookies, setCookie] = useCookies([VACANCIES_QUERY_COOKIE_NAME]);
  const { tab = DEFAULT_TAB_NAME } = cookies[VACANCIES_QUERY_COOKIE_NAME] ?? {};

  const handleTabChange = useCallback((e: React.ChangeEvent<HTMLBaseElement>) => {
    const newCookie = { ...cookies[VACANCIES_QUERY_COOKIE_NAME], tab: e.target.id as TTabName, page: 1 };

    setCookie(VACANCIES_QUERY_COOKIE_NAME, newCookie);
  }, [cookies, setCookie]);

  return (
    <Tabs value={tab} onChange={handleTabChange}>
      {tabsConfig.map(({ value, text }) => <Tab key={value} id={value} label={text} value={value} />)}
    </Tabs>
  );
}
