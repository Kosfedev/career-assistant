// TODO: синхронизировать с industries entity || schema?
export type TIndustry = {
  id: string;
  name: string;
};

export type TEmployerSelected = { id:number, name:string, count: number, industries?: TIndustry[], industriesMain?: TIndustry[] };