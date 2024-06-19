'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

type SuggestedSkill = { id: number; text: string };

export default function SkillsPage() {
  const [skill, setSkill] = useState('');
  const [stagedSkills, setStagedSkills] = useState<SuggestedSkill[]>([]);
  const [savedSkills, setSavedSkills] = useState<SuggestedSkill[]>([]);
  const { data: suggestedSkills, isFetching, refetch } = useQuery({
    queryKey: ['get-skill-set-suggests'],
    queryFn: () => fetch(`https://api.hh.ru/suggests/skill_set?text=${skill}`).then(res => res.json()),
    enabled: false,
  });

  const isSearchDisabled = isFetching || skill.length < 2 || skill.length > 3000;

  const changeSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkill(e.currentTarget.value);
  };

  const getSkillsSuggestions = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    refetch();
  };

  const toggleStagedSkill = (newStagedSkill: SuggestedSkill) => {
    const stagedSkillIndex = stagedSkills.findIndex(({ id }) => id === newStagedSkill.id);
    const stagedSkillsNew = [...stagedSkills];

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    stagedSkillIndex !== -1
      ? stagedSkillsNew.splice(stagedSkillIndex, 1)
      : stagedSkillsNew.push(newStagedSkill);

    setStagedSkills(stagedSkillsNew);
  };

  const saveSkills = () => {
    setSavedSkills([...savedSkills, ...stagedSkills]);
    setStagedSkills([]);
  };

  return (
    <section>
      <form>
        <label htmlFor={'skill'}>Введите название навыка:</label>
        <input name={'skill'} id={'skill'} onChange={changeSkill} />
        <button disabled={isSearchDisabled} onClick={getSkillsSuggestions}>Найти</button>
      </form>
      <h2>
        Доступные варианты:
      </h2>
      <ul>
        {suggestedSkills?.items.map(skillSuggestion => (
          <li key={skillSuggestion.id}>
            <button type="button" disabled={savedSkills.some(({ id }) => id === skillSuggestion.id)}
                    onClick={() => toggleStagedSkill(skillSuggestion)}>
              <p>{skillSuggestion.id}</p>
              <p>{skillSuggestion.text}</p>
            </button>
          </li>
        ))}
      </ul>
      <button disabled={stagedSkills.length === 0} onClick={saveSkills}>Сохранить навыки</button>
      <ul>
        {savedSkills?.map(skillSuggestion => (
          <li key={skillSuggestion.id}>
            <p>{skillSuggestion.id}</p>
            <p>{skillSuggestion.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
