'use client';

import React from 'react';
import Link from 'next/link';
import { TVacancyDetails, useGetHHVacancyById } from '@/entities/vacancy';
import { useLSDictionaries } from '@/entities/dictionaries';

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

export default function VacancyPage({ params }: { params: { vacancyId: string } }) {
  const { data: vacancy = {} } = useGetHHVacancyById(Number(params.vacancyId));
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name, description, experience, salary, key_skills, schedule } = vacancy as TVacancyDetails;

  return (
    <main className="flex-grow p-4 bg-dark-200 rounded-lg first:mt-0 *:mt-2">
      <Link className="text-primary-500 hover:text-primary-400 active:text-primary-300" href="/">На
        главную
      </Link>
      <p>
        {name}
      </p>
      <p>
        {experience?.name}
      </p>
      <p>
        {schedule?.name}
      </p>
      <Salary salary={salary} />
      <div dangerouslySetInnerHTML={{ __html: description }} />
      {key_skills?.length > 0 && (
        <div className="mt-6">
          <p>Ключевые навыки:</p>
          <ul className="mt-4">
            {key_skills.map(({ name: skillName }) => <li key={skillName} className="mt-1">{skillName}</li>)}
          </ul>
        </div>
      )}
    </main>
  );
}
