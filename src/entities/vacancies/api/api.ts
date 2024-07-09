import queryString from 'query-string';
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { BACKEND_BASE_URL } from '@/shared/config';
import { TVacancyResponse } from '../model/types';

export const useGetHHVacancies = (params: { [p: string]: string } = {}) => {
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancies-overview', paramsString],
    queryFn: () => fetch(`${BACKEND_BASE_URL}/vacancies?${paramsString}`).then(res => res.json()),
  } as DefinedInitialDataOptions<TVacancyResponse[]>);
};
