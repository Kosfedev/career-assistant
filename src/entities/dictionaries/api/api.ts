import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HH_END_POINT } from '@/shared/config';
import { TDictionaries } from '../model/types';

export const useGetDictionaries = ({ enabled }: { enabled?: boolean }) => {
  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['dictionaries'],
    queryFn: () => fetch(`${HH_END_POINT}/dictionaries`).then(res => res.json()),
    enabled,
  } as UseQueryOptions<TDictionaries>);
};

