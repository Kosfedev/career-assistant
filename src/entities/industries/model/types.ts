import { components } from '@/shared/schemas/hh';

export type TIndustries = components['schemas']['DictionariesIndustriesResponse'];

// TODO: синхронизировать с industries entity || schema?
export type TIndustry = {
  id: string;
  name: string;
};

export type TIndustryStat = TIndustry & { countEmployers: number, countVacancies: number };
