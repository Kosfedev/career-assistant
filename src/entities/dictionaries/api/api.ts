import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { BACKEND_BASE_URL } from '@/shared/config';
import { TDictionaries } from '../model/types';

export const useGetDictionaries = ({ enabled }: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ['dictionaries'],
    queryFn: () => fetch(`${BACKEND_BASE_URL}/dictionaries`).then(res => res.json()),
    enabled,
  } as DefinedInitialDataOptions<TDictionaries[]>);
};

