'use client';

import React, { useCallback, useMemo } from 'react';
import { TVacancyDetails, useGetHHVacancyById, useMutateVacancy } from '@/entities/vacancy';
import { useLSDictionaries } from '@/entities/dictionaries';
import { PageHeader } from '@/shared/ui';
import { THHVacancyKeySkill, useSkillsLS } from '@/entities/skills';
import classNames from 'classnames';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import {
  EVacancyStatuses,
  useVacanciesLS,
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

const StatusSelect: React.FC<{ vacancy: TVacancyDetails }> = ({ vacancy }) => {
  const { useUpdateVacancy } = useMutateVacancy();
  const { mutateAsync: updateVacancy } = useUpdateVacancy();
  const { vacanciesLS, deleteVacancyLS } = useVacanciesLS();
  const vacancyOverview = vacanciesLS[vacancy.id];

  const options = useMemo(() => {
    const keys = Object.keys(EVacancyStatuses).filter((key) => isNaN(+key));

    return keys.map((key) => {
      return <MenuItem key={key} value={EVacancyStatuses[key as keyof typeof EVacancyStatuses]}>
        {VACANCY_STATUS_NAMES.get(key)}
      </MenuItem>;
    });
  }, []);

  const handleStatusChange = useCallback((e: SelectChangeEvent<EVacancyStatuses>) => {
    const newStatus = Number(e.target.value);
    const isSetDefault = newStatus === EVacancyStatuses.Default;

    if (isSetDefault) {
      deleteVacancyLS(Number(vacancy.id));

      return;
    }

    updateVacancy({ vacancyId: vacancy.id, updatedFields: { status: newStatus } });
  }, [deleteVacancyLS, updateVacancy, vacancy.id]);

  return (
    <Select value={vacancyOverview?.status ?? EVacancyStatuses.Default} onChange={handleStatusChange}>
      {options}
    </Select>
  );
};

export const VacancyDetails: React.FC<{ vacancyId: number }> = ({ vacancyId }) => {
  const { data: vacancy } = useGetHHVacancyById(vacancyId);
  const { skillsLS } = useSkillsLS();

  if (!vacancy) {
    return null;
  }

  const { name, description = '', experience, salary, key_skills, schedule, published_at } = vacancy;
  const skillsReg = new RegExp(`(${skillsLS.map(({ text }) => text).join('|')})`, 'g');
  const formatedDescription = description.replaceAll(skillsReg, '<span class="text-green-500">$1</span>');

  return (
    <>
      <PageHeader>
        {name}
      </PageHeader>
      <StatusSelect vacancy={vacancy} />
      <div>
        <p>Опубликована: {new Date(published_at).toLocaleDateString()}</p>
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
