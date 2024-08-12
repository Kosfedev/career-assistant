'use client';

import React, { FormEvent, useState } from 'react';
import { TextField } from '@mui/material';
import { SkillBadge, THHSuggestedSkill, TSkill, useGetHHSuggestedSkills, useSkillsLS } from '@/entities/skills';
import { Button } from '@/shared/ui';

export const SkillsAdder = () => {
  const [skillSearch, setSkillSearch] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [stagedForSaveHHSkills, setStagedForSaveHHSkills] = useState<THHSuggestedSkill[]>([]);
  const { data: suggestedSkills, refetch, isFetching } = useGetHHSuggestedSkills(skillSearch);
  const { skillsLS, saveSkillsLS } = useSkillsLS();

  // TODO: вынести магические числа
  const isSearchDisabled = isFetching || skillSearch.length < 2 || skillSearch.length > 3000;

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

  const saveHHSkills = () => {
    saveSkillsLS(stagedForSaveHHSkills);
    setStagedForSaveHHSkills([]);
  };

  const saveCustomSkill = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSkill: TSkill = { text: customSkill };

    saveSkillsLS([newSkill]);
    setStagedForSaveHHSkills([]);
  };

  return (
    <div>
      <form onSubmit={saveCustomSkill}>
        <TextField id="skill" label="Любые навыки" onChange={changeCustomSkill} />
        <Button className="ml-4" disabled={customSkill.length === 0}>Сохранить</Button>
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
                        disabled={skillsLS.some(({ id }) => id === skillSuggestion.id)}
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
