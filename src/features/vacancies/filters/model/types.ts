import { TDictionaries } from '@/entities/dictionaries';

// TODO: импортировать полностью из сгенерированных типов
export type TVacanciesFiltersInputs =
  { text?: string; salary?: number }
  & Pick<TDictionaries, 'employment' | 'experience' | 'schedule' | 'currency' | 'vacancy_search_fields'>;
