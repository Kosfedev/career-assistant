import React from 'react';
import { useTableColumns } from '../model/columns-config';
import { TEmployerSelected } from '@/entities/employers-selected';
import { Table } from '@/shared/ui';

export function EmployersSelectedTable({ employers = [] }: { employers: TEmployerSelected[] }) {
  const columns = useTableColumns();

  return <Table data={employers} columns={columns}/>;
}
