'use client';

import React, { useMemo } from 'react';
import { TVacancyDetails, useGetHHVacancyById } from '@/entities/vacancy';
import { useLSDictionaries } from '@/entities/dictionaries';
import { PageHeader } from '@/shared/ui';
import { THHVacancyKeySkill, useSkillsLS } from '@/entities/skills';
import classNames from 'classnames';
import { MenuItem, Select } from '@mui/material';
import {
  EVacancyStatuses,
  TVacancyOverviewExtended,
  useVacanciesOverviewLS,
  VACANCY_STATUS_NAMES,
} from '@/entities/vacancies';

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

const StatusSelect: React.FC<{ vacancyId: number }> = ({ vacancyId }) => {
  const { vacanciesLS, saveVacancyLS } = useVacanciesOverviewLS();
  const vacancyOverview = vacanciesLS[vacancyId] as TVacancyOverviewExtended;

  const options = useMemo(() => {
    const keys = Object.keys(EVacancyStatuses).filter((key) => isNaN(+key));
    
    return keys.map((key) => {
      return <MenuItem key={key} value={EVacancyStatuses[key]}>
        {VACANCY_STATUS_NAMES.get(key)}
      </MenuItem>;
    });
  }, []);


  return (
    <Select value={vacancyOverview?.status ?? EVacancyStatuses.Default} onChange={(e) => {
      saveVacancyLS(vacancyOverview, +e.target.value as EVacancyStatuses);
    }}>
      {options}
    </Select>
  );
};

export const VacancyDetails: React.FC<{ vacancyId: number }> = ({ vacancyId }) => {
  const { data: vacancy = {} as TVacancyDetails } = useGetHHVacancyById(vacancyId);
  const { name, description = '', experience, salary, key_skills, schedule } = vacancy;
  const { skillsLS } = useSkillsLS();
  const skillsReg = new RegExp(`(${skillsLS.map(({ text }) => text).join('|')})`, 'g');
  const formatedDescription = description.replaceAll(skillsReg, '<span class="text-green-500">$1</span>');

  return (
    <>
      <PageHeader>
        {name}
      </PageHeader>
      <StatusSelect vacancyId={vacancyId} />
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
