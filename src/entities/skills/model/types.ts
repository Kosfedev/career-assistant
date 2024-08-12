import { components } from '@/shared/schemas/hh';

export type THHSuggestedSkill = components['schemas']['_IncludesSkillSetItem'];
export type TSkill = Partial<THHSuggestedSkill> & Pick<THHSuggestedSkill, 'text'>;
export type THHVacancyKeySkill = components['schemas']['VacancyKeySkillItem'];
export type THHSuggestedSkillsResponse = components['schemas']['SuggestsSkillSet'];
