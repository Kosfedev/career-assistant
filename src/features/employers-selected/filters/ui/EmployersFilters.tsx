'use client';

import React from 'react';
import { useFormik } from 'formik';
import { Select, TextField, MenuItem, InputLabel, FormControl } from '@mui/material';

import { Button } from '@/shared/ui';
import { useAppNavigation } from '@/shared/lib';
import { useFiltersInitialValues } from '../model/filters-initial-values';
import { TEmployersFiltersInputs } from '../model/types';
import { useLSIndustriesDict } from '@/entities/industries';

export const EmployersFilters = () => {
  const { pushQuery } = useAppNavigation();

  const [industriesDict] = useLSIndustriesDict();
  const initialValues = useFiltersInitialValues();

  const { values, handleChange, handleSubmit } = useFormik<TEmployersFiltersInputs>({
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

  if (!industriesDict) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="flex [&:not(:first-child)]:*:ml-4">
      <div className="flex flex-col [&:not(:first-child)]:*:mt-2">
        <TextField name="id"
                   value={values.id}
                   label="ID"
                   className="w-60"
                   onChange={handleChange}
        />
        <TextField name="name"
                   value={values.name}
                   label="Название"
                   className="w-60"
                   onChange={handleChange}
        />
      </div>
      <div className="flex flex-col [&:not(:first-child)]:*:mt-2">
        {/* TODO: вынести select в shared */}
        <FormControl>
          <InputLabel id="industry-main-label">Основная сфера</InputLabel>
          <Select name="industryMainId"
                  value={values.industryMainId}
                  label="Основная сфера"
                  labelId="industry-main-label"
                  className="w-60"
                  onChange={handleChange}
          >
            <MenuItem value="">-</MenuItem>
            {industriesDict.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
          </Select>
        </FormControl>
        <Button type="submit">
          Найти
        </Button>
      </div>
    </form>
  );
};
