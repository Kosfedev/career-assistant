'use client';

import React, { useMemo } from 'react';
import { TVacancyDetails, useGetHHVacancyById } from '@/entities/vacancy';
import { useLSDictionaries } from '@/entities/dictionaries';
import { PageHeader } from '@/shared/ui';
import { THHVacancyKeySkill, useSkillsLS } from '@/entities/skills';
import classNames from 'classnames';
import { MenuItem, Select } from '@mui/material';
import { useVacanciesOverviewLS, TVacancyOverviewExtended, TVacancyStatus } from '@/entities/vacancies';

const Salary: React.FC<{ salary: TVacancyDetails['salary'] }> = ({ salary }) => {
  const [dictionaries] = useLSDictionaries();
  // TODO: вынести в lib
  const currencyCode = salary?.currency;
  const currencyItem = dictionaries?.currency.find(({ code }) => code === currencyCode);
  const currency = currencyItem ? currencyItem.abbr : currencyCode;

  return (
    <div>
      <p>Зарплата:</p>
      <p>{salary ? `От ${salary.from ?? '-'} - До ${salary.to ?? '-'} ${currency}` : 'Не указана'}</p>
    </div>
  );
};

const KeySkill = ({ name }: THHVacancyKeySkill) => {
  const { skillsLS } = useSkillsLS();

  return useMemo(() => {
    const isSkillPresent = skillsLS.some(({ text }) => text.toLowerCase() === name?.toLowerCase());

    return (
      <li className={classNames('mt-1', { 'text-green-300': isSkillPresent })}>
        {name}
      </li>
    );
  }, [name, skillsLS]);
};

export const VacancyDetails: React.FC<{ vacancyId: number }> = ({ vacancyId }) => {
  const { data: vacancy = {} as TVacancyDetails } = useGetHHVacancyById(vacancyId);
  const { name, description = '', experience, salary, key_skills, schedule } = vacancy;
  const { skillsLS } = useSkillsLS();
  const skillsReg = new RegExp(`(${skillsLS.map(({ text }) => text).join('|')})`, 'g');
  const formatedDescription = description.replaceAll(skillsReg, '<span class="text-green-500">$1</span>');
  const { vacanciesLS, saveVacancyLS } = useVacanciesOverviewLS();
  const vacancyOverview = vacanciesLS[vacancy.id] as TVacancyOverviewExtended;

  return (
    <>
      <PageHeader>
        {name}
      </PageHeader>
      <Select value={vacancyOverview?.status ?? 0} onChange={(e) => {
        saveVacancyLS(vacancyOverview, +e.target.value as TVacancyStatus);
      }}>
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
      </Select>
      <div>
        <p>
          {experience?.name}
        </p>
        <p>
          {schedule?.name}
        </p>
        <Salary salary={salary} />
      </div>
      <div className="*:mt-2" dangerouslySetInnerHTML={{ __html: formatedDescription }} />
      {key_skills?.length > 0 && (
        <div className="mt-6">
          <p>Ключевые навыки:</p>
          <ul className="mt-4">
            {key_skills.map(({ name: skillName }) => <KeySkill key={skillName} name={skillName} />)}
          </ul>
        </div>
      )}
    </>
  );
};
