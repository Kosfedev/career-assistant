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
  const { name, description, experience, salary, schedule } = vacancy as TVacancyDetails;

  return (
    <section>
      <div>
        <Link href="/">На главную</Link>
      </div>
      {name}
      <p>
        {experience?.name}
      </p>
      <p>
        {schedule?.name}
      </p>
      <Salary salary={salary} />
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </section>
  );
}
