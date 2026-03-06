import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HH_END_POINT } from '@/shared/config';
import { TEmployerResponse  } from '../model/types';

export const useGetEmployerById = (employerId: number, enabled: boolean = true) => {
  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['hh-employer-by-id', employerId],
    queryFn: () => fetch(`${HH_END_POINT}/employers/${employerId}`).then(res => res.json()),
    enabled,
  } as UseQueryOptions<TEmployerResponse>);
};
