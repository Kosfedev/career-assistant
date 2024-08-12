import type { components } from '@/shared/schemas/hh';

export type TVacanciesResponse = components['schemas']['VacanciesVacanciesResponse'];
export type TVacancyOverview = components['schemas']['VacanciesVacanciesItem'];

export type TVacancyStatus = 0 | 1 | 2 | 3 | 4 | 5;
export type TVacancyOverviewExtended = components['schemas']['VacanciesVacanciesItem'] & { status: TVacancyStatus };
export type TVacanciesStorage = { [id: string]: TVacancyOverviewExtended };
