'use client';

import React, { FormEvent, useState } from 'react';
import { TextField } from '@mui/material';
import {
  SkillBadge,
  THHSuggestedSkill,
  TSkill,
  useGetHHSuggestedSkills, useGetSavedSkills,
  useMutateSkill,
} from '@/entities/skills';
import { Button } from '@/shared/ui';

export const SkillsAdder = () => {
  const [skillSearch, setSkillSearch] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [stagedForSaveHHSkills, setStagedForSaveHHSkills] = useState<THHSuggestedSkill[]>([]);
  const { data: suggestedSkills, refetch, isFetching } = useGetHHSuggestedSkills(skillSearch);
  const { data: skills = [], refetch: fetchSavedSkills } = useGetSavedSkills();
  const { useSaveSkill } = useMutateSkill();
  const { mutateAsync: saveSkills } = useSaveSkill();

  // TODO: вынести магические числа
  const isSearchDisabled = isFetching || skillSearch.length < 2 || skillSearch.length > 3000;
  const isCustomSkillExists = skills.some((skill) => skill.text.toLowerCase() === customSkill.toLowerCase());

  const changeSkillSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillSearch(e.currentTarget.value);
  };

  const changeCustomSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomSkill(e.currentTarget.value);
  };

  const getSkillsSuggestions = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStagedForSaveHHSkills([]);
    refetch();
  };

  const toggleStagedForSaveSkill = (newStagedSkill: THHSuggestedSkill) => {
    const stagedSkillIndex = stagedForSaveHHSkills.findIndex(({ id }) => id === newStagedSkill.id);
    const stagedSkillsNew = [...stagedForSaveHHSkills];

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    stagedSkillIndex !== -1
      ? stagedSkillsNew.splice(stagedSkillIndex, 1)
      : stagedSkillsNew.push(newStagedSkill);

    setStagedForSaveHHSkills(stagedSkillsNew);
  };

  const saveHHSkills = async () => {
    // @ts-ignore
    await saveSkills(stagedForSaveHHSkills as TSkill);
    setStagedForSaveHHSkills([]);
    fetchSavedSkills();
  };

  const saveCustomSkill = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSkill: TSkill = { text: customSkill };

    // @ts-ignore
    await saveSkills([newSkill]);
    setStagedForSaveHHSkills([]);
    fetchSavedSkills();
  };

  return (
    <div>
      <form onSubmit={saveCustomSkill}>
        <TextField id="skill" label="Любые навыки" onChange={changeCustomSkill} />
        <Button className="ml-4" disabled={customSkill.length === 0 || isCustomSkillExists}>Сохранить</Button>
      </form>
      <div className="mt-4 first:*:mt-0 *:mt-4">
        <form onSubmit={getSkillsSuggestions}>
          <TextField id="skill" label="Навыки HeadHunter" onChange={changeSkillSearch} />
          <Button className="ml-4" disabled={isSearchDisabled}>Найти</Button>
        </form>
        <div className="min-h-40 min-w-60 max-w-80 pt-2 pr-4 pb-4 pl-2 rounded bg-dark-300">
          {suggestedSkills?.items.map(skillSuggestion => (
            <SkillBadge key={skillSuggestion.text}
                        skill={skillSuggestion}
                        disabled={skills.some(({ id }) => id === skillSuggestion.id)}
                        isActive={stagedForSaveHHSkills.some(({ id }) => id == skillSuggestion.id)}
                        onClick={() => toggleStagedForSaveSkill(skillSuggestion)}
            />
          ))}
        </div>
        <Button disabled={stagedForSaveHHSkills.length === 0} onClick={saveHHSkills}>Сохранить</Button>
      </div>
    </div>
  );
};
