import queryString from 'query-string';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { HH_END_POINT } from '@/shared/config';
import { TVacancyDetails } from '../model/types';

export const useGetHHVacancyById = (vacancyId: number, params: { [p: string]: string } = {}) => {
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancy-by-id', vacancyId, paramsString],
    queryFn: () => fetch(`${HH_END_POINT}/vacancies/${vacancyId}?${paramsString}`).then(res => res.json()),
  } as UseQueryOptions<TVacancyDetails>);
};
