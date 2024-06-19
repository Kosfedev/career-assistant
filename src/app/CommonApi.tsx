'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocalStorage } from 'usehooks-ts';

export function CommonApi() {
  // TODO: вынести ключ 'dictionaries'
  const [dictionaries, setDictionaries] = useLocalStorage<any>('dictionaries', null);
  // TODO: разрулить типы
  const { data, isFetched } = useQuery({
    queryKey: ['dictionaries'],
    queryFn: () => fetch('https://api.hh.ru/dictionaries').then(res => res.json()),
    enabled: !dictionaries,
  });

  useEffect(() => {
    if (isFetched) {
      setDictionaries(data);
    }
  }, [data, isFetched, setDictionaries]);

  return null;
}
