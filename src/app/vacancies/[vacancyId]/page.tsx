'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const VacancyDetails = dynamic(() => import('@/widgets/vacancy-details').then(mod => mod.VacancyDetails), { ssr: false });

export default function VacancyPage({ params }: { params: { vacancyId: string } }) {
  return (
    <section className="flex-grow p-4 bg-dark-200 rounded-lg first:mt-0 *:mt-6">
      <VacancyDetails vacancyId={Number(params.vacancyId)} />
    </section>
  );
}
