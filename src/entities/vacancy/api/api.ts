import queryString from 'query-string';
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { BACKEND_BASE_URL } from '@/shared/config';
import { TVacancyDetails } from '../model/types';

export const useGetHHVacancyById = (vacancyId: number, params: { [p: string]: string } = {}) => {
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancy-by-id', vacancyId, paramsString],
    queryFn: () => fetch(`${BACKEND_BASE_URL}/vacancies/${vacancyId}?${paramsString}`).then(res => res.json()),
  } as DefinedInitialDataOptions<TVacancyDetails[]>);
};
