import queryString from 'query-string';
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { BACKEND_END_POINT, HH_END_POINT } from '@/shared/config';
import { TVacancyDetails } from '../model/types';
import { TVacancyStored } from '@/entities/vacancies';

export const useGetHHVacancyById = (vacancyId: number, params: { [p: string]: string } = {}) => {
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancy-by-id', vacancyId, paramsString],
    queryFn: () => fetch(`${HH_END_POINT}/vacancies/${vacancyId}?${paramsString}`).then(res => res.json()),
  } as UseQueryOptions<TVacancyDetails>);
};

// TODO: FSD breach with EVacancyStatuses import
const useSaveVacancy = () => {

  // TODO: разрулить типы более красиво
  return useMutation({
    queryKey: ['vacancy-save'],
    mutationFn: (vacancy: TVacancyStored) => fetch(`${BACKEND_END_POINT}/vacancy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vacancy),
    }).then(res => res.json()),
    // TODO: any
  } as any);
};

// TODO: FSD breach with EVacancyStatuses import
const useUpdateVacancy = () => {

  // TODO: разрулить типы более красиво
  return useMutation({
    queryKey: ['vacancy-update'],
    mutationFn: ({
      vacancyId,
      updatedFields,
    }: { vacancyId: Pick<TVacancyStored, 'id'>, updatedFields: Partial<TVacancyStored> }) => {
      console.log(vacancyId, updatedFields);
      return fetch(`${BACKEND_END_POINT}/vacancy/${vacancyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      }).then(res => res.json());
    },
    // TODO: any
  } as any);
};

export const useMutateVacancy = () => ({ useSaveVacancy, useUpdateVacancy });

