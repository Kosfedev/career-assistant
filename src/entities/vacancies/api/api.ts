import { useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { BACKEND_BASE_URL } from '@/shared/config';
import { TVacancyResponse } from '../model/types';

export const useGetVacancies = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const fixedParams = { ...params, page: params.page ? params.page - 1 : 0 };
  const paramsString = queryString.stringify(fixedParams, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancies-overview', paramsString],
    queryFn: () => fetch(`${BACKEND_BASE_URL}/vacancies?${paramsString}`).then(res => res.json()),
  } as DefinedInitialDataOptions<TVacancyResponse[]>);
};
