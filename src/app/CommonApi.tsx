'use client';

import { useEffect } from 'react';

import { useGetDictionaries, useLSDictionaries } from '@/entities/dictionaries';

export function CommonApi() {
  const [savedDictionaries, setSavedDictionaries] = useLSDictionaries();
  const { data: newDictionaries, isFetched } = useGetDictionaries({ enabled: !savedDictionaries });

  useEffect(() => {
    if (isFetched && newDictionaries) {
      setSavedDictionaries(newDictionaries);
    }
  }, [newDictionaries, isFetched, setSavedDictionaries]);

  return null;
}
