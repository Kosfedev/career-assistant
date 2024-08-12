import React, { SyntheticEvent, useCallback } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useAppNavigation } from '@/shared/lib';
import { tabsConfig, DEFAULT_TAB_NAME } from '../model/config';
import { TTabName } from '../model/types';
import classNames from 'classnames';

export function VacanciesTabs(): React.ReactNode {
  const { searchParamsObj, pushQuery } = useAppNavigation();
  const { tab = DEFAULT_TAB_NAME } = searchParamsObj;

  const handleTabChange = useCallback((e: SyntheticEvent<Element, Event>) => {
    const newParams = { ...searchParamsObj, tab: e.currentTarget.id as TTabName, page: 1 };

    pushQuery(newParams);
  }, [searchParamsObj, pushQuery]);
  
  return (
    <Tabs value={tab} className="bg-dark-200 rounded-lg last:*:*:bg-primary-300" onChange={handleTabChange}>
      {tabsConfig.map(({ value, text }) => (
        <Tab key={value}
             className={classNames({
               'text-primary-500 hover:text-primary-400 grow': true,
               '!text-primary-300': value === tab,
             })}
             id={value}
             label={text}
             value={value}
        />
      ))}
    </Tabs>
  );
}
