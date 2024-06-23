'use client';

import React from 'react';
import { useFormik } from 'formik';
import { usePathname, useRouter } from 'next/navigation';
import queryString from 'query-string';

import { useLSDictionaries } from '@/entities/dictionaries';
import { TVacanciesFiltersInputs } from '../model/types';
import { useFiltersInitialValues } from '../model/initial-values';

export function VacanciesFilters(): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const [dictionaries] = useLSDictionaries();
  const { employment, experience, schedule, currency }: TVacanciesFiltersInputs = dictionaries;
  const initialValues = useFiltersInitialValues();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (v) => {
      const query = queryString.stringify(v);
      const correctPathName = pathname.replace(/^\//, '');

      router.push(`${correctPathName}/?${query}`);
    },
  });

  if (!dictionaries) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Текст</label>
      <input name={'text'}
             value={values.text}
             onChange={handleChange}
      />
      <label>Поиск</label>
      <input name={'search_field'}
             value={values.search_field}
             onChange={handleChange}
      />
      <label>Опыт работы</label>
      <select name={'experience'}
              value={values.experience}
              onChange={handleChange}
      >
        {experience?.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
      </select>
      <label>Тип трудоустройства</label>
      <select name={'employment'}
              value={values.employment}
              onChange={handleChange}
      >
        {employment?.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
      </select>
      <label>Расписание</label>
      <select
        name={'schedule'}
        value={values.schedule}
        onChange={handleChange}
      >
        {schedule?.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
      </select>
      <label>Только с зарплатой</label>
      <input name={'only_with_salary'}
             value={values.only_with_salary}
             onChange={handleChange}
             type="checkbox"
      />
      <label>Валюта</label>
      <select name={'currency'}
              value={values.currency}
              onChange={handleChange}
      >
        {currency?.map(({ code, name }) => <option key={code} value={code}>{code} {name}</option>)}
      </select>
      <label>Зарплата</label>
      <input name={'salary'}
             value={values.salary}
             onChange={handleChange}
             type={'number'}
      />
      <button type="submit">
        Применить
      </button>
    </form>
  );
}
