import React from 'react';
import { useTableColumns } from '../model/columns-config';
import { Table } from '@/shared/ui';
import { TIndustryStat } from '@/entities/industries';

export function IndustriesTable({ industries = [] }: { industries: TIndustryStat[] }) {
  const columns = useTableColumns();

  return <Table data={industries} columns={columns}/>;
}
