'use client';

import React from 'react';
import { useFormik } from 'formik';
import { Checkbox, Select, TextField, MenuItem } from '@mui/material';

import { useLSDictionaries } from '@/entities/dictionaries';
import { Button } from '@/shared/ui';
import { useAppNavigation } from '@/shared/lib';
import { useFiltersInitialValues } from '../model/filters-initial-values';
import { TVacanciesFiltersInputs } from '../model/types';

export const VacanciesFilters = () => {
  const { pushQuery } = useAppNavigation();

  const [dictionaries] = useLSDictionaries();
  const { employment, experience, schedule, currency, vacancy_search_fields } = dictionaries ?? {};
  const initialValues = useFiltersInitialValues();

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<TVacanciesFiltersInputs>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (filters) => {
      const filledFilters: Record<string, unknown> = { page: 1 };

      for (const filterName in filters) {
        const value = filters[filterName as keyof typeof filters];

        // TODO: сделать более точную проверку (чтобы потенциально не скипало 0)
        if (!!value) {
          filledFilters[filterName] = value;
        }
      }

      pushQuery(filledFilters);
    },
  });

  if (!dictionaries) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 *:ml-4 first:*:ml-0">
      <div className="flex flex-col *:mt-2 first:*:mt-0">
        <TextField name="text"
                   value={values.text}
                   label="Текст"
                   className="w-60"
                   onChange={handleChange}
        />
        <Select name="search_field"
                value={values.search_field}
                label="Где искать"
                className="w-60"
                onChange={handleChange}
        >
          <MenuItem value="">-</MenuItem>
          {vacancy_search_fields?.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
        </Select>
      </div>
      <div className="flex flex-col *:mt-2 first:*:mt-0">
        <Select name="employment"
                value={values.employment}
                label="Тип трудоустройства"
                className="w-60"
                onChange={handleChange}
        >
          <MenuItem value="">-</MenuItem>
          {employment?.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
        </Select>
        <Select
          name="schedule"
          value={values.schedule}
          labelId="demo-simple-select-label"
          label="Расписание"
          aria-disabled={false}
          className="w-60"
          onChange={handleChange}
        >
          <MenuItem value="">-</MenuItem>
          {schedule?.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
        </Select>
      </div>
      <div className="flex flex-col *:mt-2 first:*:mt-0">
        <div className="flex items-center w-60 h-14 text-primary-500">
          <label htmlFor="with-salary">Только с зарплатой</label>
          <Checkbox name="only_with_salary"
                    id="with-salary"
                    checked={values.only_with_salary}
                    onChange={() => setFieldValue('only_with_salary', !values.only_with_salary)}
          />
        </div>
        <Select name="experience"
                value={values.experience}
                label={'Опыт работы'}
                className="w-60"
                onChange={handleChange}
        >
          <MenuItem value="">-</MenuItem>
          {experience?.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
        </Select>
      </div>
      <div className="flex flex-col *:mt-2 first:*:mt-0">
        <Select name="currency"
                value={values.currency}
                label="Валюта"
                onChange={handleChange}
        >
          <MenuItem value="">-</MenuItem>
          {currency?.map(({ code, name }) => <MenuItem key={code} value={code}>{code} {name}</MenuItem>)}
        </Select>
        <TextField name="salary"
                   value={values.salary}
                   label="Зарплата"
                   onChange={handleChange}
        />
      </div>
      <Button type="submit">
        Найти
      </Button>
    </form>
  );
};
