import { TDictionaries } from '@/entities/dictionaries';

// TODO: импортировать полностью из сгенерированных типов
export type TVacanciesFiltersInputs =
  { text?: string; search_field?: string; salary?: number }
  & Pick<TDictionaries, 'employment' | 'experience' | 'schedule' | 'currency'>;
