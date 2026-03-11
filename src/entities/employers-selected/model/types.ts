// TODO: нарушение fsd: entity -> entity import
import { TIndustry } from '@/entities/industries';

export type TEmployerSelected = { id:number, name:string, count: number, industries?: TIndustry[], industriesMain?: TIndustry[] };