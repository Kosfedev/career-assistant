'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export function CommonApi() {
  const { data, isFetched } = useQuery({
    queryKey: ['dictionaries'],
    queryFn: () => fetch('https://api.hh.ru/dictionaries').then(res => res.json()),
  });

  useEffect(() => {
    if (isFetched) {
      console.log(data);
    }
  }, [data, isFetched]);

  return null;
}
