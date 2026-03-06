import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HH_END_POINT } from '@/shared/config';
import { TIndustries } from '../model/types';

export const useGetIndustries = ({ enabled }: { enabled?: boolean }) => {
  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['industries'],
    queryFn: () => fetch(`${HH_END_POINT}/industries`).then(res => res.json()),
    enabled,
  } as UseQueryOptions<TIndustries>);
};

