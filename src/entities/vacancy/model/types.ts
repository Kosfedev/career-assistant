import type { components } from '@/shared/schemas/hh';
import { EVacancyStatuses } from '@/entities/vacancies';

export type TVacancyDetails = components['schemas']['VacanciesVacancy'];
// TODO: FSD breach - same layer slices cross import
export type TVacancyDetailsExtended = TVacancyDetails & { status: EVacancyStatuses };
