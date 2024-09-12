import queryString from 'query-string';
import { UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { BE_END_POINT, HH_END_POINT } from '@/shared/config';
import { TVacanciesResponse, TVacancyStored, TVacancyDetails } from '../model/types';

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

export const useGetHHVacancyById = (vacancyId: number, params: { [p: string]: string } = {}) => {
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['hh-vacancy-by-id', vacancyId, paramsString],
    queryFn: () => fetch(`${HH_END_POINT}/vacancies/${vacancyId}?${paramsString}`).then(res => res.json()),
  } as UseQueryOptions<TVacancyDetails>);
};

export const useGetStoredVacancyById = (vacancyId: number, params: { [p: string]: string } = {}) => {
  const paramsString = queryString.stringify(params, { skipNull: true, skipEmptyString: true });

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['vacancy-by-id', vacancyId, paramsString],
    queryFn: () => fetch(`${BE_END_POINT}/vacancies/${vacancyId}`)
      .then(res => {
        // TODO: fix whole catching process
        if (res.status !== 200) {
          return null;
        }

        return res.json();
      }),
  } as UseQueryOptions<TVacancyStored>);
};

const useSaveVacancy = () => {

  // TODO: разрулить типы более красиво
  return useMutation({
    queryKey: ['vacancy-save'],
    mutationFn: (vacancy: TVacancyStored) => fetch(`${BE_END_POINT}/vacancies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vacancy),
    }).then(res => res.json()),
    // TODO: any
  } as any);
};

const useUpdateVacancy = () => {

  // TODO: разрулить типы более красиво
  return useMutation({
    queryKey: ['vacancy-update'],
    mutationFn: ({
      vacancyId,
      updatedFields,
    }: { vacancyId: Pick<TVacancyStored, 'id'>, updatedFields: Partial<TVacancyStored> }) => {
      return fetch(`${BE_END_POINT}/vacancies/${vacancyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields),
      });
    },
    // TODO: any
  } as any);
};

const useDeleteVacancy = () => {

  // TODO: разрулить типы более красиво
  return useMutation({
    queryKey: ['vacancy-delete'],
    mutationFn: (vacancyId: Pick<TVacancyStored, 'id'>) => {
      return fetch(`${BE_END_POINT}/vacancies/${vacancyId}`, { method: 'DELETE' });
    },
    // TODO: any
  } as any);
};

export const useMutateVacancy = () => ({ useSaveVacancy, useUpdateVacancy, useDeleteVacancy });
