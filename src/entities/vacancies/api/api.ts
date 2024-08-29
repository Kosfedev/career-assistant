import queryString from 'query-string';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { HH_END_POINT } from '@/shared/config';
import { TVacanciesResponse } from '../model/types';

export const useGetHHVacancies = (params: { [p: string]: string | number } = {}) => {
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancies-overview', paramsString],
    queryFn: () => fetch(`${HH_END_POINT}/vacancies?${paramsString}`).then(res => res.json()),
  } as UseQueryOptions<TVacanciesResponse>);
};
