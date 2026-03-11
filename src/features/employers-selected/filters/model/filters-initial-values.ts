import { useMemo } from 'react';
import { useAppNavigation } from '@/shared/lib';
import { TEmployersFiltersInitialValues } from './types';

export const useFiltersInitialValues = (): TEmployersFiltersInitialValues => {
  const { searchParamsObj } = useAppNavigation();

  const {
    id,
    name,
    industryMainId,
  } = searchParamsObj;

  return useMemo(() => ({
    id: id ?? '',
    name: name ?? '',
    industryMainId: industryMainId ?? '',
  }), [id, name, industryMainId]);
};
