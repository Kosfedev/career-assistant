import type { components } from '@/shared/schemas/hh';
import { EVacancyStatuses } from './constants';

export type TVacanciesResponse = components['schemas']['VacanciesVacanciesResponse'];
export type TVacancyOverview = components['schemas']['VacanciesVacanciesItem'];

export type TVacancyOverviewExtended = components['schemas']['VacanciesVacanciesItem'] & { status: EVacancyStatuses };
export type TVacanciesStorage = { [id: string]: TVacancyOverviewExtended };
