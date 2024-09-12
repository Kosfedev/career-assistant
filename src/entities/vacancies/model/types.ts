import type { components } from '@/shared/schemas/hh';
import { EVacancyStatuses } from './constants';

export type TVacanciesResponse = components['schemas']['VacanciesVacanciesResponse'];
export type TVacancyOverview = components['schemas']['VacanciesVacanciesItem'];

export type TVacancyOverviewExtended = TVacancyOverview & { status: EVacancyStatuses };
export type TVacancyDetails = components['schemas']['VacanciesVacancy'];
export type TVacancyDetailsExtended = TVacancyDetails & { status: EVacancyStatuses };
export type TVacancyStored = TVacancyOverviewExtended | TVacancyDetailsExtended;
