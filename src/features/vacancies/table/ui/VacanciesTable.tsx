import React from 'react';
import { TVacancyOverview } from '@/entities/vacancies';
import { useTableColumns } from '../model/columns-config';
import { Table } from '@/shared/ui';

export function VacanciesTable({ vacancies = [] }: { vacancies: TVacancyOverview[] }) {
  const columns = useTableColumns();

  return <Table data={vacancies} columns={columns}/>;
}
