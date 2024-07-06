'use client';

import { VacanciesFullTable } from '@/widgets/vacancies-table';

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <VacanciesFullTable />
    </main>
  );
}
