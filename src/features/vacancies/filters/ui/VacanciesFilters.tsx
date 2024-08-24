'use client';

import React from 'react';
import { useFormik } from 'formik';
import { Checkbox, Select, TextField, MenuItem, InputLabel, FormControl } from '@mui/material';

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
    <form onSubmit={handleSubmit} className="flex [&:not(:first-child)]:*:ml-4">
      <div className="flex flex-col [&:not(:first-child)]:*:mt-2">
        <TextField name="text"
                   value={values.text}
                   label="Текст"
                   className="w-60"
                   onChange={handleChange}
        />
        {/* TODO: вынести select в shared */}
        <FormControl>
          <InputLabel id="search-field-label">Где искать</InputLabel>
          <Select name="search_field"
                  value={values.search_field}
                  label="Где искать"
                  labelId="search-field-label"
                  className="w-60"
                  onChange={handleChange}
          >
            <MenuItem value="">-</MenuItem>
            {vacancy_search_fields?.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-col [&:not(:first-child)]:*:mt-2">
        <FormControl>
          <InputLabel id="employment-label">Тип трудоустройства</InputLabel>
          <Select name="employment"
                  value={values.employment}
                  label="Тип трудоустройства"
                  labelId="employment-label"
                  className="w-60"
                  onChange={handleChange}
          >
            <MenuItem value="">-</MenuItem>
            {employment?.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="schedule-label">Расписание</InputLabel>
          <Select
            name="schedule"
            value={values.schedule}
            label="Расписание"
            labelId="schedule-label"
            aria-disabled={false}
            className="w-60"
            onChange={handleChange}
          >
            <MenuItem value="">-</MenuItem>
            {schedule?.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-col [&:not(:first-child)]:*:mt-2">
        <label htmlFor="with-salary" className="flex justify-between items-center h-14 pl-3 text-primary-500">
          Только с зарплатой
          <Checkbox name="only_with_salary"
                    id="with-salary"
                    checked={values.only_with_salary}
                    onChange={() => setFieldValue('only_with_salary', !values.only_with_salary)}
          />
        </label>
        <FormControl>
          <InputLabel id="experience-label">Опыт работы</InputLabel>
          <Select name="experience"
                  value={values.experience}
                  label="Опыт работы"
                  labelId="experience-label"
                  className="w-60"
                  onChange={handleChange}
          >
            <MenuItem value="">-</MenuItem>
            {experience?.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-col [&:not(:first-child)]:*:mt-2">
        <FormControl>
          <InputLabel id="currency-label">Валюта</InputLabel>
          <Select name="currency"
                  value={values.currency}
                  labelId="experience-label"
                  label="Валюта"
                  className="w-60"
                  onChange={handleChange}
          >
            <MenuItem value="">-</MenuItem>
            {currency?.map(({ code, name }) => <MenuItem key={code} value={code}>{code} {name}</MenuItem>)}
          </Select>
        </FormControl>
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
