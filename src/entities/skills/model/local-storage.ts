import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { THHSuggestedSkill, TSkill } from '../model/types';

const useSkillsLSBase = () => useLocalStorage<TSkill[]>('skills', []);

const useSaveSkills = () => {
  const [skillsStored, setSkillsStored] = useSkillsLSBase();

  return useCallback((skillsToSave: (THHSuggestedSkill | TSkill)[]) => {
    const skillsToSaveFiltered = skillsToSave.filter((skillToSave) => !skillsStored.some((storedSkill) => {
      const isSameTextSkill = storedSkill.text.toLowerCase() === skillToSave.text.toLowerCase();
      const isUpgradedSkill = isSameTextSkill && !storedSkill.id && !!skillToSave.id;
      const isFullDuplicate = isSameTextSkill && !isUpgradedSkill;

      return isFullDuplicate;
    }));

    const skillsStoredFiltered = skillsStored.filter((storedSkill) => !skillsToSave.some((skillToSave) => {
      const isSameTextSkill = storedSkill.text.toLowerCase() === skillToSave.text.toLowerCase();
      const isUpgradedSkill = isSameTextSkill && !storedSkill.id && !!skillToSave.id;

      return isUpgradedSkill;
    }));

    const newTotalSkills = [...skillsStoredFiltered, ...skillsToSaveFiltered];
    const sortedSkills = newTotalSkills.sort((a, b) => a.text.localeCompare(b.text));

    setSkillsStored(sortedSkills);
  }, [setSkillsStored, skillsStored]);
};

const useDeleteSkills = () => {
  const [skillsStored, setSkillsStored] = useSkillsLSBase();

  return useCallback((skills: (THHSuggestedSkill | TSkill)[]) => {
    const newSkills = skillsStored.filter(({ text }) => !skills.some((storedSkill) => storedSkill.text === text));

    setSkillsStored(newSkills);
  }, [setSkillsStored, skillsStored]);
};

export const useSkillsLS = () => {
  const [skillsLS] = useSkillsLSBase();
  const saveSkillsLS = useSaveSkills();
  const deleteSkillsLS = useDeleteSkills();

  return { skillsLS, saveSkillsLS, deleteSkillsLS };
};
