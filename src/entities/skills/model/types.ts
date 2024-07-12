import { components } from '@/shared/schemas/hh';
import { DefinedInitialDataOptions } from '@tanstack/react-query';

export type THHSuggestedSkill = components['schemas']['_IncludesSkillSetItem'];
export type TSkill = Partial<THHSuggestedSkill> & Pick<THHSuggestedSkill, 'text'>;
export type THHSuggestedSkillsResponse = DefinedInitialDataOptions<components['schemas']['SuggestsSkillSet']>;
