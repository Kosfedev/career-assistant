import { useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';

import { BACKEND_BASE_URL } from '@/shared/config';
import { TVacancyOverview } from '@/shared/api';

export const useGetVacancies = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });
  
  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancies-overview', paramsString],
    queryFn: () => fetch(`${BACKEND_BASE_URL}/vacancies?${paramsString}`).then(res => res.json().then(json => json.items)),
  } as DefinedInitialDataOptions<TVacancyOverview[]>);
};
