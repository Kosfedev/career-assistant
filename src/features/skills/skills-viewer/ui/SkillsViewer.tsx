'use client';

import React, { useState } from 'react';
import { SkillBadge, TSkill, useGetSavedSkills, useMutateSkill } from '@/entities/skills';
import { Button } from '@/shared/ui';

export const SkillsViewer = () => {
  const [stagedForDeleteLSSkills, setStagedForDeleteLSSkills] = useState<TSkill[]>([]);
  const { data: skills = [], refetch: fetchSavedSkills } = useGetSavedSkills();
  const { useDeleteSkills } = useMutateSkill();
  const { mutateAsync } = useDeleteSkills();

  const toggleStagedForDeleteSkill = (newStagedSkill: TSkill) => {
    const stagedSkillIndex = stagedForDeleteLSSkills.findIndex(({ text }) => text === newStagedSkill.text);
    const stagedSkillsNew = [...stagedForDeleteLSSkills];

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    stagedSkillIndex !== -1
      ? stagedSkillsNew.splice(stagedSkillIndex, 1)
      : stagedSkillsNew.push(newStagedSkill);

    setStagedForDeleteLSSkills(stagedSkillsNew);
  };

  const deleteLSSkills = async () => {
    const skillTexts = stagedForDeleteLSSkills.map(({ text }) => text);

    // @ts-ignore
    await mutateAsync(skillTexts);
    setStagedForDeleteLSSkills([]);
    fetchSavedSkills();
  };

  return (
    <div className="first:*:mt-0 *:mt-4">
      <h3>
        Сохраненные навыки:
      </h3>
      <div className="min-h-40 min-w-60 max-w-80 pt-2 pr-4 pb-4 pl-2 rounded bg-dark-300">
        {skills.map(savedSkill => (
          <SkillBadge key={savedSkill.text}
                      skill={savedSkill}
                      isActive={stagedForDeleteLSSkills.some(({ text }) => text == savedSkill.text)}
                      onClick={() => toggleStagedForDeleteSkill(savedSkill)}
          />
        ))}
      </div>
      <Button disabled={stagedForDeleteLSSkills.length === 0} onClick={deleteLSSkills}>Удалить</Button>
    </div>
  );
};
