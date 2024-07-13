import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { THHSuggestedSkill, TSkill } from '../model/types';

const useLSSkillsBase = () => useLocalStorage<TSkill[]>('skills', []);

const useSaveSkills = () => {
  const [skillsStored, setSkillsStored] = useLSSkillsBase();

  return useCallback((skills: (THHSuggestedSkill | TSkill)[]) => {
    const newSkills = skills.filter(({ text }) => !skillsStored.some((storedSkill) => storedSkill.text === text));
    const newTotalSkills = [...skillsStored, ...newSkills];
    const sortedSkills = newTotalSkills.sort((a, b) => a.text.localeCompare(b.text));

    setSkillsStored(sortedSkills);
  }, [setSkillsStored, skillsStored]);
};

const useDeleteSkills = () => {
  const [skillsStored, setSkillsStored] = useLSSkillsBase();

  return useCallback((skills: (THHSuggestedSkill | TSkill)[]) => {
    const newSkills = skillsStored.filter(({ text }) => !skills.some((storedSkill) => storedSkill.text === text));

    setSkillsStored(newSkills);
  }, [setSkillsStored, skillsStored]);
};

export const useSkillsLS = () => {
  const [skillsLS] = useLSSkillsBase();
  const saveSkillsLS = useSaveSkills();
  const deleteSkillsLS = useDeleteSkills();

  return { skillsLS, saveSkillsLS, deleteSkillsLS };
};
