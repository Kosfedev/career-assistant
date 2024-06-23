import { useMemo } from 'react';

import { useLSDictionaries } from '@/entities/dictionaries';
import { TVacanciesFiltersInputs } from './types';

export const useFiltersInitialValues = () => {
  const [dictionaries] = useLSDictionaries();
  const { employment, experience, schedule, currency }: TVacanciesFiltersInputs = dictionaries;

  return useMemo(() => ({
    text: '',
    search_field: '',
    employment: employment ? employment[0].id : '',
    experience: experience ? experience[0].id : '',
    schedule: schedule ? schedule[0].id : '',
    currency: currency ? currency[0].code : '',
    salary: '',
    only_with_salary: false,
  }), [currency, employment, experience, schedule]);
};
