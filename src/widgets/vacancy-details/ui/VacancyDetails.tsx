'use client';

import React, { useCallback, useMemo } from 'react';
import { useLSDictionaries } from '@/entities/dictionaries';
import { Link, PageHeader } from '@/shared/ui';
import { THHVacancyKeySkill, useGetSavedSkills } from '@/entities/skills';
import classNames from 'classnames';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { EVacancyStatuses, TVacancyDetails, useMutateVacancy, VACANCY_STATUS_NAMES } from '@/entities/vacancies';
import { useGetHHVacancyById, useGetStoredVacancyById } from '@/entities/vacancies/api/api';

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
  const { data: skills = [] } = useGetSavedSkills();

  return useMemo(() => {
    const isSkillPresent = skills.some(({ text }) => text.toLowerCase() === name?.toLowerCase());

    return (
      <li className={classNames('mt-1', { 'text-green-300': isSkillPresent })}>
        {name}
      </li>
    );
  }, [name, skills]);
};

const StatusSelect: React.FC<{ vacancy: TVacancyDetails, vacancyId: number }> = ({
  vacancy,
  vacancyId,
}) => {
  const { data: storedVacancy, refetch: fetchStoredVacancy } = useGetStoredVacancyById(vacancyId);
  const { useSaveVacancy, useUpdateVacancy, useDeleteVacancy } = useMutateVacancy();
  const { mutateAsync: saveVacancy } = useSaveVacancy();
  const { mutateAsync: updateVacancy } = useUpdateVacancy();
  const { mutateAsync: deleteVacancy } = useDeleteVacancy();

  const options = useMemo(() => {
    const keys = Object.keys(EVacancyStatuses).filter((key) => isNaN(+key));

    return keys.map((key) => {
      return <MenuItem key={key} value={EVacancyStatuses[key as keyof typeof EVacancyStatuses]}>
        {VACANCY_STATUS_NAMES.get(key)}
      </MenuItem>;
    });
  }, []);

  const handleStatusChange = useCallback(async (e: SelectChangeEvent<EVacancyStatuses>) => {
    const newStatus = Number(e.target.value);
    const isSetDefault = newStatus === EVacancyStatuses.Default;

    switch (true) {
      case !storedVacancy:
        // TODO: type error during deploy
        // @ts-ignore
        await saveVacancy({ ...vacancy, status: newStatus });
        break;
      case isSetDefault:
        // TODO: type error during deploy
        // @ts-ignore
        await deleteVacancy(vacancy.id);
        break;
      default:
        // TODO: type error during deploy
        // @ts-ignore
        await updateVacancy({ vacancyId: vacancy.id, updatedFields: { status: newStatus } });
    }

    fetchStoredVacancy();
  }, [
    deleteVacancy,
    fetchStoredVacancy,
    saveVacancy,
    storedVacancy,
    updateVacancy,
    vacancy,
  ]);

  return (
    <Select value={storedVacancy?.status ?? EVacancyStatuses.Default} onChange={handleStatusChange}>
      {options}
    </Select>
  );
};

export const VacancyDetails: React.FC<{ vacancyId: number }> = ({ vacancyId }) => {
  const { data: HHVacancy } = useGetHHVacancyById(vacancyId);
  const { data: skills = [] } = useGetSavedSkills();

  if (!HHVacancy) {
    return null;
  }

  const { name, description = '', experience, salary, key_skills, schedule, published_at, alternate_url } = HHVacancy;
  const skillsReg = new RegExp(`(${skills.map(({ text }) => text).join('|')})`, 'ig');
  const formatedDescription = skills.length > 0 ? description.replaceAll(skillsReg, '<span class="text-green-500">$1</span>') : description;

  return (
    <>
      <PageHeader>
        <Link href={alternate_url} target={'_blank'}>
          {name}
        </Link>
      </PageHeader>
      <StatusSelect vacancy={HHVacancy} vacancyId={vacancyId} />
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
