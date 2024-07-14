import React from 'react';
import dynamic from 'next/dynamic';
import { PageHeader } from '@/shared/ui';

const SkillsAdder = dynamic(() => import('@/features/skills/skills-adder').then(mod => mod.SkillsAdder), { ssr: false });
const SkillsViewer = dynamic(() => import('@/features/skills/skills-viewer').then(mod => mod.SkillsViewer), { ssr: false });

export default function SkillsPage() {
  return (
    <section className="flex-grow p-4 bg-dark-200 rounded-lg first:*:mt-0 *:mt-8">
      <PageHeader>Ключевые навыки</PageHeader>
      <SkillsAdder />
      <SkillsViewer />
    </section>
  );
}
