import type { components } from '@/shared/schemas/hh';
import { EVacancyStatuses } from './constants';
import { TVacancyDetailsExtended } from '@/entities/vacancy';

export type TVacanciesResponse = components['schemas']['VacanciesVacanciesResponse'];
export type TVacancyOverview = components['schemas']['VacanciesVacanciesItem'];

export type TVacancyOverviewExtended = TVacancyOverview & { status: EVacancyStatuses };
// TODO: FSD breach - same layer slices cross import
export type TVacancyStored = TVacancyOverviewExtended | TVacancyDetailsExtended;
export type TVacanciesStorage = { [id: string]: TVacancyStored };
