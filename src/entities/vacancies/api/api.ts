import queryString from 'query-string';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { BE_END_POINT, HH_END_POINT } from '@/shared/config';
import { TVacanciesResponse, TVacancyStored } from '../model/types';

export const useGetHHVacancies = (params: { [p: string]: string | number } = {}, enabled: boolean = true) => {
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancies-overview', paramsString],
    queryFn: () => fetch(`${HH_END_POINT}/vacancies?${paramsString}`).then(res => res.json()),
    enabled,
  } as UseQueryOptions<TVacanciesResponse>);
};

export const useGetSavedVacancies = (params: { [p: string]: string | number } = {}, enabled: boolean = true) => {
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancies-saved', paramsString],
    queryFn: () => fetch(`${BE_END_POINT}/vacancies?${paramsString}`).then(res => res.json()),
    enabled,
  } as UseQueryOptions<TVacancyStored[]>);
};
