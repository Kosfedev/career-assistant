'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import { TextField } from '@mui/material';
import {
  THHSuggestedSkill,
  TSkill,
  useSkillsLS,
  useGetHHSuggestedSkills,
} from '@/entities/skills';
import { Button } from '@/shared/ui';

// TODO: добавить lazy loading (ошибка при гидрации)
export default function SkillsPage() {
  const [skill, setSkill] = useState('');
  const [stagedForSaveSkills, setStagedForSaveSkills] = useState<THHSuggestedSkill[]>([]);
  const [stagedForDeleteSkills, setStagedForDeleteSkills] = useState<TSkill[]>([]);
  const { data: suggestedSkills, refetch, isFetching } = useGetHHSuggestedSkills(skill);
  const { skillsLS, saveSkillsLS, deleteSkillsLS } = useSkillsLS();

  // TODO: вынести магические числа
  const isSearchDisabled = isFetching || skill.length < 2 || skill.length > 3000;

  const changeSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.currentTarget.value);
  };

  const getSkillsSuggestions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStagedForSaveSkills([]);
    refetch();
  };

  const toggleStagedForSaveSkill = (newStagedSkill: THHSuggestedSkill) => {
    const stagedSkillIndex = stagedForSaveSkills.findIndex(({ id }) => id === newStagedSkill.id);
    const stagedSkillsNew = [...stagedForSaveSkills];

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    stagedSkillIndex !== -1
      ? stagedSkillsNew.splice(stagedSkillIndex, 1)
      : stagedSkillsNew.push(newStagedSkill);

    setStagedForSaveSkills(stagedSkillsNew);
  };

  const toggleStagedForDeleteSkill = (newStagedSkill: TSkill) => {
    const stagedSkillIndex = stagedForDeleteSkills.findIndex(({ id }) => id === newStagedSkill.id);
    const stagedSkillsNew = [...stagedForDeleteSkills];

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    stagedSkillIndex !== -1
      ? stagedSkillsNew.splice(stagedSkillIndex, 1)
      : stagedSkillsNew.push(newStagedSkill);

    setStagedForDeleteSkills(stagedSkillsNew);
  };

  const saveSkills = () => {
    saveSkillsLS(stagedForSaveSkills);
    setStagedForSaveSkills([]);
  };

  const deleteSkills = () => {
    deleteSkillsLS(stagedForDeleteSkills);
    setStagedForDeleteSkills([]);
  };

  return (
    <section className="flex-grow p-4 bg-dark-200 rounded-lg first:*:mt-0 *:mt-8">
      <div className="first:*:mt-0 *:mt-2">
        <form onSubmit={getSkillsSuggestions}>
          <TextField id="skill" onChange={changeSkill} />
          <Button className="ml-4" disabled={isSearchDisabled}>Найти</Button>
        </form>
        <h2>
          Доступные варианты:
        </h2>
        <div className="min-h-40 min-w-60 max-w-80 pt-2 pr-4 pb-4 pl-2 rounded bg-dark-300">
          {suggestedSkills?.items.map(skillSuggestion => (
            <Button type="button"
                    key={skillSuggestion.id}
                    className={classNames('!min-w-12 h-auto mt-2 ml-2 !p-2 text-xs', { '!bg-primary-200': stagedForSaveSkills.some(({ id }) => id == skillSuggestion.id) })}
                    disabled={skillsLS.some(({ id }) => id === skillSuggestion.id)}
                    onClick={() => toggleStagedForSaveSkill(skillSuggestion)}
            >
              {skillSuggestion.text}
            </Button>
          ))}
        </div>
        <Button disabled={stagedForSaveSkills.length === 0} onClick={saveSkills}>Сохранить</Button>
      </div>
      <div className="first:*:mt-0 *:mt-2">
        <h2>
          Сохраненные навыки:
        </h2>
        <div className="min-h-40 min-w-60 max-w-80 pt-2 pr-4 pb-4 pl-2 rounded bg-dark-300">
          {skillsLS.map(savedSkill => (
            <Button type="button"
                    key={savedSkill.id}
                    className={classNames('!min-w-12 h-auto mt-2 ml-2 !p-2 text-xs', { '!bg-primary-200': stagedForDeleteSkills.some(({ id }) => id == savedSkill.id) })}
                    onClick={() => toggleStagedForDeleteSkill(savedSkill)}
            >
              {savedSkill.text}
            </Button>
          ))}
        </div>
        <Button disabled={stagedForDeleteSkills.length === 0} onClick={deleteSkills}>Удалить</Button>
      </div>
    </section>
  );
}
