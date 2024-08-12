import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { BACKEND_BASE_URL } from '@/shared/config';
import { THHSuggestedSkillsResponse } from '../model/types';

export const useGetHHSuggestedSkills = (skill: string) => {
  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['get-skill-set-suggests', skill],
    queryFn: () => fetch(`${BACKEND_BASE_URL}/suggests/skill_set?text=${skill}`).then(res => res.json()),
    enabled: false,
  } as UseQueryOptions<THHSuggestedSkillsResponse>);
};
