'use client';

import { useEffect } from 'react';

import { useGetDictionaries, useLSDictionaries } from '@/entities/dictionaries';
import { useGetIndustries, useLSIndustriesDict } from '@/entities/industries';

export function CommonApi() {
  const [savedDictionaries, setSavedDictionaries] = useLSDictionaries();
  const [savedIndustries, setSavedIndustries] = useLSIndustriesDict();
  const { data: newDictionaries, isFetched: isDictionariesFetched } = useGetDictionaries({ enabled: !savedDictionaries });
  const { data: newIndustries, isFetched: isIndustriesFetched } = useGetIndustries({ enabled: !savedIndustries });

  useEffect(() => {
    if (isDictionariesFetched && newDictionaries) {
      setSavedDictionaries(newDictionaries);
    }
  }, [newDictionaries, isDictionariesFetched, setSavedDictionaries]);

  useEffect(() => {
    if (isIndustriesFetched && newIndustries) {
      setSavedIndustries(newIndustries);
    }
  }, [newIndustries, isIndustriesFetched, setSavedIndustries]);

  return null;
}
