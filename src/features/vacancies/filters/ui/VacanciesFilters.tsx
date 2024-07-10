'use client';

import React from 'react';
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie';

import { useLSDictionaries } from '@/entities/dictionaries';
import { VACANCIES_QUERY_COOKIE_NAME } from '@/entities/vacancies';
import { TVacanciesFiltersInputs } from '../model/types';
import { useFiltersInitialValues, useFiltersStateManager } from '../model/hooks';

export function VacanciesFilters(): React.ReactNode {
  // TODO: вынести в page.tsx - влияет и на пагинацию и табы -> должно быть в виджете/странице
  useFiltersStateManager();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCookie] = useCookies([VACANCIES_QUERY_COOKIE_NAME]);
  const [dictionaries] = useLSDictionaries();
  const { employment, experience, schedule, currency }: TVacanciesFiltersInputs = dictionaries;
  const initialValues = useFiltersInitialValues();

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (filters) => {
      const filledFilters = { page: 1 };

      for (const filterName in filters) {
        // TODO: сделать более точную проверку (чтобы потенциально не скипало 0)
        if (!!filters[filterName]) {
          filledFilters[filterName] = filters[filterName];
        }
      }

      setCookie(VACANCIES_QUERY_COOKIE_NAME, filledFilters);
    },
  });

  if (!dictionaries) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label>Текст</label>
      {/* TODO: пофиксить value у инпутов */}
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
        <option value="">{' '}</option>
        {experience?.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
      </select>
      <label>Тип трудоустройства</label>
      <select name={'employment'}
              value={values.employment}
              onChange={handleChange}
      >
        <option value="">{' '}</option>
        {employment?.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
      </select>
      <label>Расписание</label>
      <select
        name={'schedule'}
        value={values.schedule}
        onChange={handleChange}
      >
        <option value="">{' '}</option>
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
        <option value="">{' '}</option>
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
