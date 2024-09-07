import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { BE_END_POINT, HH_END_POINT } from '@/shared/config';
import { THHSuggestedSkillsResponse, TSkill } from '../model/types';

export const useGetHHSuggestedSkills = (skill: string) => {
  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['get-skill-set-suggests', skill],
    queryFn: () => fetch(`${HH_END_POINT}/suggests/skill_set?text=${skill}`).then(res => res.json()),
    enabled: false,
  } as UseQueryOptions<THHSuggestedSkillsResponse>);
};

export const useGetSavedSkills = () => {

  // TODO: разрулить типы более красиво
  return useQuery({
    queryKey: ['skills-get'],
    queryFn: () => fetch(`${BE_END_POINT}/skills`).then(res => res.json()),
  } as UseQueryOptions<TSkill[]>);
};

const useSaveSkill = () => {
  return useMutation({
    queryKey: ['skills-save'],
    mutationFn: (skills: TSkill | TSkill[]) => {
      const body = JSON.stringify({ skills: Array.isArray(skills) ? skills : [skills] });

      return fetch(`${BE_END_POINT}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      }).then(res => res.json());
    },
    // TODO: any
  } as any);
};

const useDeleteSkills = () => {
  return useMutation({
    queryKey: ['skills-delete'],
    mutationFn: (skillTexts: string | string[]) => {
      const body = JSON.stringify({ skill_texts: Array.isArray(skillTexts) ? skillTexts : [skillTexts] });

      return fetch(`${BE_END_POINT}/skills`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      });
    },
    // TODO: any
  } as any);
};

export const useMutateSkill = () => ({ useSaveSkill, useDeleteSkills });
