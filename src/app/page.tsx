'use client';

import styles from './page.module.css';
import { useState } from 'react';
import { Table } from '../features/vacancies-table/ui/VacanciesTable';
import { VacancyCommonFields } from '../shared/api/models';

export default function Home() {
  const [vacancies, setVacancies] = useState<VacancyCommonFields[]>([]);

  const getData = async () => {
    const url = "https://api.hh.ru/vacancies?text='frontend удаленная работа'&per_page=50&only_with_salary=true";
    const res = await fetch(url);
    const data: VacancyCommonFields[] = (await res.json()).items;

    setVacancies(data);
  };

  return (
    <main className={styles.main}>
      <button onClick={getData}>Сделать выгрузку</button>
      <Table vacancies={vacancies} />
    </main>
  );
}
