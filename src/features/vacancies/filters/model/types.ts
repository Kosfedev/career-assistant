import { operations } from '@/shared/schemas/hh';

type TVacanciesQuery = Required<operations['get-vacancies']['parameters']>['query'];
export type TVacanciesFiltersInputs =
  Pick<TVacanciesQuery, 'schedule' | 'only_with_salary' | 'currency' | 'text' | 'experience' | 'employment' | 'search_field'>
  & { salary: string };
export type TVacanciesFiltersInitialValues = Required<TVacanciesFiltersInputs>;
