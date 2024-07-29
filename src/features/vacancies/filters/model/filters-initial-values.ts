import { useMemo } from 'react';
import { useAppNavigation } from '@/shared/lib';

export const useFiltersInitialValues = () => {
  const { searchParamsObj } = useAppNavigation();

  const {
    currency,
    employment,
    experience,
    only_with_salary,
    salary,
    schedule,
    search_field,
    text,
  } = searchParamsObj;

  return useMemo(() => ({
    text: text ?? '',
    search_field: search_field ?? '',
    employment: employment ?? '',
    experience: experience ?? '',
    schedule: schedule ?? '',
    currency: currency ?? '',
    salary: salary ?? '',
    only_with_salary: only_with_salary === 'true',
  }), [
    currency,
    employment,
    experience,
    only_with_salary,
    salary,
    schedule,
    search_field,
    text,
  ]);
};
